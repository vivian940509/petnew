<?php
$router->register(action: 'doLogin', class: 'Authorization', method: 'doLogin');
// 保留現有的使用者路由
$router->register(action: 'getUsers', class: 'user', method: 'getUsers');
$router->register(action: 'newUser', class: 'user', method: 'newUser');
$router->register(action: 'removeUser', class: 'user', method: 'removeUser');
$router->register(action: 'updateUser', class: 'user', method: 'updateUser');

// 更新寵物路由
$router->register(action: 'getpet_information', class: 'pet', method: 'getPets');
$router->register(action: 'newpet_information', class: 'pet', method: 'newPet');
$router->register(action: 'removepet_information', class: 'pet', method: 'removePet');
$router->register(action: 'updatepet_information', class: 'pet', method: 'updatePet');

// 新增領養路由
$router->register(
    action: 'getAdoptions',
    class:  Adoption::class,
    method: 'getAdoptions'
);

$router->register(
    action: 'insertAdoption',
    class:  Adoption::class,
    method: 'insertAdoption'
);

$router->register(
    action: 'updateAdoption',
    class:  Adoption::class,
    method: 'updateAdoption'
);
$router->register(
    action: 'removeAdoption',
    class:  Adoption::class,
    method: 'removeAdoption'
);
?>