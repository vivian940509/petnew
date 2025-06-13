<?php
// app/Core/Router.php
namespace Vendor;

class Router
{
    private array $routeTable = [];

    /**
     * @param string $action  路由名稱，如 'getUsers'
     * @param string $class   控制器類別名，不含 namespace，例如 'User'
     * @param string $method  方法名，例如 'index'
     */
    public function register(string $action, string $class, string $method): void
    {
        $this->routeTable[$action] = [
            'class'  => $class,
            'method' => $method,
        ];
    }

    public function run(string $action)
    {
        if (!isset($this->routeTable[$action])) {
            throw new \RuntimeException("Route [$action] not found");
        }

        $class  = $this->routeTable[$action]['class'];
        $method = $this->routeTable[$action]['method'];

        // 組出完整 FQN：App\Controllers\User
        $fqcn = "App\\Controllers\\" . ucfirst($class);

        if (!class_exists($fqcn)) {
            throw new \RuntimeException("Controller [$fqcn] not found");
        }

        $controller = new $fqcn();

        if (!method_exists($controller, $method)) {
            throw new \RuntimeException("Method [$method] not found in [$fqcn]");
        }

        return $controller->$method();
    }
}
