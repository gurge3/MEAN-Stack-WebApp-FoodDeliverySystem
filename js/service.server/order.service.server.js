module.exports = function (app, models) {
    var orderModel = models.orderModel;

    app.post("/api/project/user/:userId/order", createOrder);
    app.get("/api/project/user/:userId/order", findOrdersByUserId);
    app.get("/api/project/deliveryMan/:deliveryManId/order",findOrdersByDeliveryManId);
    app.get("/api/project/order/:orderId", findOrderById);
    // Do Edit-Order and Cancel-Order Here
    app.put("/api/project/order/:orderId", updateOrder);
    app.get("/api/project/orders", getAllOrders);

    function createOrder(req, res) {
        var userId = req.params.userId;
        var order = req.body;

        orderModel
            .createOrder(userId, order)
            .then(
                function (order) {
                    res.sendStatus(200);
                },
                function (err) {
                }
            );
    }

    function findOrdersByUserId(req, res) {
        orderModel
            .findOrdersByUserId(req.params.userId)
            .then(function (orders) {
                res.json(orders);
            });
    }

    function findOrdersByDeliveryManId(req, res) {
        orderModel
            .findOrdersByDeliveryManId(req.params.deliveryManId)
            .then(function (orders) {
                res.json(orders);
            });
    }

    function findOrderById(req, res) {
        var orderId = req.params.orderId;
        orderModel
            .findOrderById(orderId)
            .then(
                function (order) {
                    res.json(order);
                },
                function (err) {
                    res.send(null);
                }
            );
    }

    function updateOrder(req, res) {
        var orderId = req.params['orderId'];
        var order = req.body;

        orderModel
            .updateOrder(orderId, order)
            .then(function (response) {
                res.json(response);
            });
    }

    function getAllOrders(req, res) {
        orderModel.getAllOrders()
            .then(function (response) {
                res.json(response);
            }, function (err) {
                res.send(null);
            })
    }
};