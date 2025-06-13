<?php
namespace App\Models;

use Vendor\DB;

class Adoption
{
    /**
     * 取得所有領養單
     *
     * @return array
     */
    public function getAdoptions()
    {
        $sql = "SELECT * FROM adoption_request";
        return DB::select($sql, []);
    }

    /**
     * 新增領養單
     *
     * @param array $data
     * @return int 新增後的 ID
     */
    public function insertAdoption(array $data)
    {
        $sql = "INSERT INTO adoption_request
            (applicant_id, pet_id, apply_date, pickup_date, status, reviewed_by)
            VALUES (?, ?, ?, ?, ?, ?)";
        return DB::insert($sql, [
            $data['applicant_id'],
            $data['pet_id'],
            $data['apply_date'],
            $data['pickup_date'],
            $data['status'],
            $data['reviewed_by']
        ]);
    }

    /**
     * 更新領養單
     *
     * @param array $data
     * @return int 受影響的列數
     */
    public function updateAdoption(array $data)
    {
        $sql = "UPDATE adoption_request SET
            applicant_id = ?,
            pet_id       = ?,
            apply_date   = ?,
            pickup_date  = ?,
            status       = ?,
            reviewed_by  = ?
          WHERE id = ?";
        return DB::update($sql, [
            $data['applicant_id'],
            $data['pet_id'],
            $data['apply_date'],
            $data['pickup_date'],
            $data['status'],
            $data['reviewed_by'],
            $data['id']
        ]);
    }

    /**
     * 刪除領養單
     *
     * @param int $id
     * @return int 受影響的列數
     */
    public function deleteAdoption(int $id)
    {
        $sql = "DELETE FROM adoption_request WHERE id = ?";
        return DB::delete($sql, [$id]);
    }
}
