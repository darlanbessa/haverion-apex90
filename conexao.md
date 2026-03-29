# 🔐 Dados de Conexão — PROJECT APEX 90

> ⚠️ ARQUIVO PRIVADO — não compartilhe publicamente nem suba para repositórios Git.

---

## 🗄️ MySQL (Banco de Dados)

| Campo    | Valor                  |
|----------|------------------------|
| Host     | `srv2021.hstgr.io`     |
| Banco    | `u708666732_darlan`    |
| Usuário  | `u708666732_darlan`    |
| Senha    | `aA96492824.`          |
| Porta    | `3306` (padrão MySQL)  |

---

## 📁 FTP (Acesso ao Servidor)

| Campo       | Valor              |
|-------------|--------------------|
| Host        | `82.25.73.202`     |
| Usuário     | `u708666732.darlan`|
| Senha       | `aA96492824.`      |
| Root Path   | `/`                |
| Porta       | `21` (padrão FTP)  |

---

## 🌐 URL de Produção

```
https://haverion.com
```

---

## 🔗 String de Conexão PHP (referência)

```php
<?php
$host     = 'srv2021.hstgr.io';
$db       = 'u708666732_darlan';
$user     = 'u708666732_darlan';
$pass     = 'aA96492824.';
$charset  = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
    throw new \PDOException($e->getMessage(), (int)$e->getCode());
}
?>
```

---

*Criado em: 2026-03-07*
