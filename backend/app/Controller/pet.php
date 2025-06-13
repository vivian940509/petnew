<?php
namespace App\Controllers;

use Vendor\Controller;      
use App\Models\Pet as PetModel;
use Vendor\DB;

class Pet extends Controller
{
    private PetModel $petModel;

    public function __construct()
    {
        $this->petModel = new PetModel();
    }

    public function getPets()
    {
        if (isset($_POST['id'])) {
            return $this->petModel->getPet($_POST['id']);
        }
        return $this->petModel->getPets();
    }

    public function newPet()
    {
        $id          = $_POST['id']          ?? '';
        $name        = $_POST['name']        ?? '';
        $species     = $_POST['species']     ?? '';
        $age         = $_POST['age']         ?? '';
        $description = $_POST['description'] ?? '';
        $photo       = $_POST['photo']       ?? '';
        $status      = $_POST['status']      ?? 'available';
        $created_by  = $_POST['created_by']  ?? '';

        if ($id === '') {
            return [
                'status'  => 400,
                'message' => '缺少必要參數 ID',
                'result'  => null,
            ];
        }

        return $this->petModel->newPet(
            $id,
            $name,
            $species,
            $age,
            $description,
            $photo,
            $status,
            $created_by
        );
    }

    public function removePet()
    {
        $id = $_POST['id'] ?? '';

        if ($id === '') {
            return [
                'status'  => 400,
                'message' => '缺少必要參數 ID',
                'result'  => null,
            ];
        }

        return $this->petModel->removePet($id);
    }

    public function updatePet()
    {
        $id          = $_POST['id']          ?? '';
        $name        = $_POST['name']        ?? '';
        $species     = $_POST['species']     ?? '';
        $age         = $_POST['age']         ?? '';
        $description = $_POST['description'] ?? '';
        $photo       = $_POST['photo']       ?? '';
        $status      = $_POST['status']      ?? '';
        $created_by  = $_POST['created_by']  ?? '';

        if ($id === '') {
            return [
                'status'  => 400,
                'message' => '缺少必要參數 ID',
                'result'  => null,
            ];
        }

        return $this->petModel->updatePet(
            $id,
            $name,
            $species,
            $age,
            $description,
            $photo,
            $status,
            $created_by
        );
    }
}
