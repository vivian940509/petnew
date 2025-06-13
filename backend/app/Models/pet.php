<?php
namespace App\Models;

use Vendor\DB;

class Pet
{
    public function getPets()
    {
        $sql = "SELECT * FROM pet_information";
        return DB::select($sql, null);
    }

    public function getPet($id)
    {
        $sql = "SELECT * FROM pet_information WHERE id = ?";
        return DB::select($sql, [$id]);
    }

    public function newPet(
        $id,
        $name,
        $species,
        $age,
        $description,
        $photo,
        $status,
        $created_by
    ) {
        $sql = "INSERT INTO pet_information 
                    (`id`, `name`, `species`, `age`, `description`, `photo`, `status`, `created_by`) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        return DB::insert($sql, [
            $id,
            $name,
            $species,
            $age,
            $description,
            $photo,
            $status,
            $created_by
        ]);
    }

    public function removePet($id)
    {
        $sql = "DELETE FROM pet_information WHERE id = ?";
        return DB::delete($sql, [$id]);
    }

    public function updatePet(
        $id,
        $name,
        $species,
        $age,
        $description,
        $photo,
        $status,
        $created_by
    ) {
        $sql = "UPDATE pet_information
                   SET name = ?, species = ?, age = ?, description = ?, photo = ?, status = ?, created_by = ?
                 WHERE id = ?";
        return DB::update($sql, [
            $name,
            $species,
            $age,
            $description,
            $photo,
            $status,
            $created_by,
            $id
        ]);
    }
}
