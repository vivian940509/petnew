<?php
require_once __DIR__ . '/../vendor/autoload.php';
// autoload vendor\ namespace classes
spl_autoload_register(function ($class) {
    $prefix = 'vendor\\';
    $baseDir = __DIR__ . '/../vendor/';
    if (strncmp($prefix, $class, strlen($prefix)) === 0) {
        $relativeClass = substr($class, strlen($prefix));
        $file = $baseDir . $relativeClass . '.php';
        if (file_exists($file)) {
            require $file;
        }
    }
});

use App\Middlewares\AuthMiddleware;
use vendor\Router;
use vendor\DB;

class Main {
    static function run() {
        // 讀取 .env, 設定相關 config
        $conf = parse_ini_file(__DIR__ . '/../.env');

        DB::$dbHost = $conf['dbHost'];
        DB::$dbName = $conf['dbName'];
        DB::$dbUser = $conf['dbUser'];
        DB::$dbPassword = $conf['dbPassword'];

        // 讀取 action 的值
        if (isset($_GET['action'])) {
            $action = $_GET['action'];
        } else {
            $action = 'no_action';
        }
      
        $response = [];
        
        // 公開路由清單（不需要 JWT 驗證的路由）
        $publicRoutes = ['doLogin', 'register', 'resetPassword'];
        
        // 檢查是否為公開路由
        if (in_array($action, $publicRoutes)) {
            switch ($action) {
                case 'doLogin':
                    $response = AuthMiddleware::doLogin();
                    break;
                case 'register':
                    // 其他公開路由處理...
                    $response = ['status' => 501, 'message' => '未實作的功能'];
                    break;
                default:
                    $response = ['status' => 404, 'message' => '找不到此路由'];
                    break;
            }
        } else {
            // 需要 JWT 驗證的路由
            $responseToken = AuthMiddleware::checkToken();
            
            if ($responseToken['status'] == 200) {
                if ($action != "no_action") {
                    // 檢查權限
                    $response = AuthMiddleware::checkPrivilege($action, $responseToken['payload']);
                    
                    if ($response['status'] == 200) {
                        $router = new Router();
                        require_once __DIR__ . "/../routes/web.php";
                        $response = $router->run($action);
                    }
                } else {
                    $response = ['status' => 200, 'message' => '沒有指定動作'];
                }
                
                // 將新 token 加入回應
                $response['token'] = $responseToken['token'];
            } else {
                // Token 無效，直接返回 checkToken 的回應
                $response = $responseToken;
            }
        }
        
        // 返回 JSON 回應
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($response);
    }
}
