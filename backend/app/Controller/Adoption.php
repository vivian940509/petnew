<?php
namespace App\Controllers;

use Vendor\Controller;
use App\Models\Adoption as AdoptionModel;

class Adoption extends Controller
{
    private AdoptionModel $adoptionModel;

    public function __construct()
    {
        $this->adoptionModel = new AdoptionModel();
    }

    /**
     * 取得所有領養單
     * @return array
     */
    public function getAdoptions()
    {
        $items = $this->adoptionModel->getAdoptions();
        return [
            'status' => 200,
            'result' => $items,
        ];
    }

    /**
     * 新增領養單
     * @return array
     */
    public function insertAdoption()
    {
        $data = [
            'applicant_id' => $_POST['applicant_id'] ?? null,
            'pet_id'       => $_POST['pet_id']       ?? null,
            'apply_date'   => $_POST['apply_date']   ?? null,
            'pickup_date'  => $_POST['pickup_date']  ?? null,
            'status'       => $_POST['status']       ?? null,
            'reviewed_by'  => null
        ];

        // 欄位驗證
        if (empty($data['applicant_id']) || empty($data['pet_id']) || empty($data['apply_date'])) {
            return [
                'status'  => 422,
                'message' => 'applicant_id、pet_id 及 apply_date 為必填',
            ];
        }

        $newId = $this->adoptionModel->insertAdoption($data);
        return [
            'status'  => 200,
            'message' => '新增領養申請成功',
            'id'      => $newId,
        ];
    }

    /**
     * 更新領養單
     * @return array
     */
    public function updateAdoption()
    {
        $data = [
            'id'           => intval($_POST['id'] ?? 0),
            'applicant_id' => $_POST['applicant_id'] ?? null,
            'pet_id'       => $_POST['pet_id']       ?? null,
            'apply_date'   => $_POST['apply_date']   ?? null,
            'pickup_date'  => $_POST['pickup_date']  ?? null,
            'status'       => $_POST['status']       ?? null,
            'reviewed_by'  => $_POST['reviewed_by']  ?? null,
        ];

        if ($data['id'] <= 0) {
            return [
                'status'  => 422,
                'message' => '缺少或無效的 id',
            ];
        }

        $this->adoptionModel->updateAdoption($data);
        return [
            'status'  => 200,
            'message' => '更新領養申請成功',
        ];
    }

    /**
     * 刪除領養單
     * @return array
     */
    public function deleteAdoption()
    {
        $id = intval($_POST['id'] ?? 0);
        if ($id <= 0) {
            return [
                'status'  => 422,
                'message' => '缺少或無效的 id',
            ];
        }

        $this->adoptionModel->deleteAdoption($id);
        return [
            'status'  => 200,
            'message' => '刪除領養申請成功',
        ];
    }
}
