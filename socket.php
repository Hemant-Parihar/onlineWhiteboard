<?php
use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;


use Ratchet\Http\HttpServer;
use Ratchet\Server\IoServer;
use Ratchet\WebSocket\WsServer;

// Make sure composer dependencies have been installed
require __DIR__ . '/vendor/autoload.php';

/**
 * chat.php
 * Send any incoming messages to all connected clients (except sender)
 */
class MyChat implements MessageComponentInterface {
    protected $clients;

    public function __construct() {
        $this->clients = new \SplObjectStorage;
    }

    public function onOpen(ConnectionInterface $conn) {
        $this->clients->attach($conn);
    }

    public function onMessage(ConnectionInterface $from, $msg) {
        echo $msg;
        foreach ($this->clients as $client) {
            if ($from != $client) {
                $client->send($msg);
            }

        }
    }

    public function onClose(ConnectionInterface $conn) {
        $this->clients->detach($conn);
    }

    public function onError(ConnectionInterface $conn, \Exception $e) {
        $conn->close();
    }
}

// Run the server application through the WebSocket protocol on port 8080
//$app = new Ratchet\App('localhost', 8080);
//$app->route('/canvas', new MyChat);
//$app->run();



$server = IoServer::factory(
    new HttpServer(
        new WsServer(new MyChat())//THIS IS THE CUSTOM CLASS NAME THAT HAS WEBSOCKET HANDLERS
    ), 8080, '192.168.43.105'
);
$server->run();