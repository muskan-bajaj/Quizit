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
router.get(
  "/report",
  middleware.check.has_role(["Student"]),
  controller.test.getTestReport
);
router.get("/report/list", controller.test.getTestReportList);
router.get(
  "/subjects",
  middleware.check.has_role(["Teacher"]),
  controller.test.getSubject
);

router.get(
  "/submission/list",
  middleware.check.has_role(["Teacher"]),
  controller.test.getStudentListSubmission
);

router.get(
  "/submission",
  middleware.check.has_role(["Teacher"]),
  controller.test.getStudentSubmission
);

router.post(
  "/submission/edit",
  middleware.check.has_role(["Teacher"]),
  controller.test.editStudentSubmission
);

router.get(
  "/publish",
  middleware.check.has_role(["Teacher"]),
  controller.test.publishTest
);
export default router;
