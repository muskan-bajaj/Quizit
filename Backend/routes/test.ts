import { Router } from "express";
import * as controller from "../controller";
import * as validator from "../validators";
import * as middleware from "../middleware";

const router = Router();

router.use(middleware.authMidleware.protect);
router.use(middleware.injector.user);

router.post(
  "/create",
  middleware.check.has_role(["Teacher"]),
  validator.test.newTest,
  controller.test.createTest
);
router.post(
  "/start",
  middleware.check.has_role(["Student"]),
  validator.test.controlTest,
  controller.test.startTest
);
router.post(
  "/end",
  middleware.check.has_role(["Student"]),
  validator.test.controlTest,
  controller.test.endTest
);
router.post(
  "/submit",
  middleware.check.has_role(["Student"]),
  validator.test.submitQuestion,
  controller.test.submitQuestion
);

router.get("/details", controller.test.getTestDetails);
router.get("/", controller.test.getTest);
router.get("/report", controller.test.getTestReport);
router.get("/report/list", controller.test.getTestReportList);

export default router;
