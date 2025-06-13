<?php
namespace App\Controllers;

use Vendor\Controller;     // 你的基底 Controller
use App\Models\User as UserModel;
use Vendor\DB;

class User extends Controller
{
    private UserModel $userModel;

    public function __construct()
    {
        $this->userModel = new UserModel();
    }

    public function getUsers()
    {
        if (isset($_POST['id'])) {
            return $this->userModel->getUser($_POST['id']);
        }
        return $this->userModel->getUsers();
    }

    public function newUser()
    {
        $id      = $_POST['id']      ?? '';
        $name    = $_POST['name']    ?? '';
        $email   = $_POST['email']   ?? '';
        $phone   = $_POST['phone']   ?? '';
        $id_card = $_POST['id_card'] ?? '';

        if ($id === '') {
            return ['status' => 400, 'message' => '缺少必要參數 ID', 'result' => null];
        }
        return $this->userModel->newUser($id, $name, $email, $phone, $id_card);
    }

    public function removeUser()
    {
        $id = $_POST['id'] ?? '';
        if ($id === '') {
            return ['status' => 400, 'message' => '缺少必要參數 ID', 'result' => null];
        }
        return $this->userModel->removeUser($id);
    }

    public function updateUser()
    {
        $id      = $_POST['id']      ?? '';
        $name    = $_POST['name']    ?? '';
        $email   = $_POST['email']   ?? '';
        $phone   = $_POST['phone']   ?? '';
        $id_card = $_POST['id_card'] ?? '';

        if ($id === '') {
            return ['status' => 400, 'message' => '缺少必要參數 ID', 'result' => null];
        }
        return $this->userModel->updateUser($id, $name, $email, $phone, $id_card);
    }
}
