<?php
namespace app\Middlewares;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Firebase\JWT\ExpiredException;
use vendor\DB;

class AuthMiddleware
{
    //跟你 genToken.php 裡一致的密鑰
    private static string $secret = 'aaaaa';
    private static string $algo   = 'HS256';

    /**
     * 檢查並解碼 JWT
     * 成功回傳 ['status'=>200,'payload'=>…,'token'=>…]
     * 失敗回傳 ['status'=>…,'message'=>…]
     */
    public static function checkToken(): array
    {
        $headers = function_exists('getallheaders')
                 ? getallheaders()
                 : $_SERVER;  // fallback

        $rawAuth = trim($headers['Authorization'] ?? '');

        if ($rawAuth === '') {
            return [
                'status'  => 400,
                'message' => '請於 Authorization 標頭提供 Bearer <token>'
            ];
        }

        if (! preg_match('/^Bearer\s+(\S+)$/', $rawAuth, $m)) {
            return [
                'status'  => 400,
                'message' => 'Authorization 格式錯誤，需 Bearer <token>'
            ];
        }

        $jwt = $m[1];

        try {
            $decoded = JWT::decode($jwt, new Key(self::$secret, self::$algo));

            // 重新發一張新 token（延長有效期）
            $newToken = self::genToken((int)$decoded->data->id);

            return [
                'status'  => 200,
                'payload' => $decoded,
                'token'   => $newToken
            ];

        } catch (ExpiredException $e) {
            return [
                'status'  => 403,
                'message' => 'Token 已過期'
            ];

        } catch (\Exception $e) {
            return [
                'status'  => 401,
                'message' => 'Token 無效或簽章錯誤'
            ];
        }
    }

    /**
     * 登入並發行 JWT
     */
    public static function doLogin(): array
    {
        $email    = trim($_POST['email']    ?? '');
        $password = $_POST['password']      ?? '';

        if ($email === '' || $password === '') {
            return [
                'status'  => 400,
                'message' => '請提供 email 與 password'
            ];
        }

        // 連資料庫查 user
   try {
            $dsn = sprintf(
                'mysql:host=%s;dbname=%s;charset=utf8mb4',
                DB::$dbHost,
                DB::$dbName
            );
            $pdo = new \PDO(
                $dsn,
                DB::$dbUser,
                DB::$dbPassword,
                [\PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION]
            );
        } catch (\PDOException $e) {
            return [
                'status'  => 500,
                'message' => 'DB 連線失敗'
            ];
        }

        $stmt = $pdo->prepare(
          'SELECT user_id, password, full_name 
             FROM users 
            WHERE email = :email 
            LIMIT 1'
        );
        $stmt->execute([':email'=>$email]);
        $user = $stmt->fetch(\PDO::FETCH_ASSOC);

        if (! $user || $password !== $user['password']) {
            return [
                'status'  => 401,
                'message' => '登入失敗：帳號或密碼錯誤'
            ];
        }

        $token = self::genToken((int)$user['user_id']);

        return [
            'status'  => 200,
            'message' => 'Access granted',
            'token'   => $token,
            'user'    => [
                'id'    => $user['user_id'],
                'email' => $email,
                'name'  => $user['full_name']
            ]
        ];
    }

    /**
     * 產生一張新的 JWT
     */
    private static function genToken(int $id): string
    {
        $now    = time();
        $exp    = $now + 300;
        $payload = [
            'iss'  => 'http://localhost',
            'aud'  => 'http://localhost',
            'iat'  => $now,
            'exp'  => $exp,
            'data' => ['id'=>$id]
        ];
        return JWT::encode($payload, self::$secret, self::$algo);
    }

    /**
     * 權限檢查範例（可按 $action && $payload->data 決定是否通過）
     */
    public static function checkPrivilege(string $action, object $payload): array
    {
        // 範例：全部通過
        return ['status'=>200];
    }
}
