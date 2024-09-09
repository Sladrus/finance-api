const Router = require("express");
const router = new Router();
const authMiddleware = require("../middleware/auth-middleware");
const chatController = require("../controllers/chat-controller");

router.get("/empty", authMiddleware, chatController.getEmptyChat);
router.post("/create", authMiddleware, chatController.createChat);
router.get("/:chat_id", authMiddleware, chatController.findChat);
router.post("/get", authMiddleware, chatController.findChatWhere);
router.post("/where", authMiddleware, chatController.findWhereTaken);
router.post("/restore", authMiddleware, chatController.restoreChat);
router.post("/update-link", authMiddleware, chatController.updateLink);
router.get("/get-url/:chat_id", authMiddleware, chatController.getChatUrl);

module.exports = router;
