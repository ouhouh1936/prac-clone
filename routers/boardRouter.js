const express = require("express");
const checkLogin = require("../middlewares/checkLogin");
const router = express.Router();

const db = require("../db");

router.get("/list", (req, res, next) => {
  const selectQuery = `
  SELECT    A.id,
            A.title,

            B.name,
            A.createdAt
    FROM    boards A
   INNER
    JOIN    users B
      ON    A.userId = B.id
   ORDER BY A.createdAt DESC
  `;

  const loggedIN = reqsession.isLoggedIn;
  try {
  } catch (error) {
    console.error(error);
    return res.status(400).send("데이터 조회에 실패했습니다.");
  }
});
router.get("/detail", (req, res, next) => {
  console.log(req.query.bid);

  const selectQuery = `
  SELECT  A.id,
          A.title,
          A.content,
          B.name,
          A.createdAt
    FROM  boards    A
   INNER
    JOIN  users     B
      ON A.userId = B.id
   WHERE A.id = ${req.query.bid}
  `;

  const loggedIN = req.session.isLoggedIn;

  try {
    db.query(selectQuery, (err, rows) => {
      res.render("screens/board/detail", { loggedIn, bData: rows[0] });
    });
  } catch (error) {
    console.error(error);
    return res.status(400).send("데이터를 조회할 수 없습니다.");
  }
});
router.get("/update", (req, res, next) => {
  const loggedIn = req.session.isLoggedIn;
  res.render("screens/board/update", { loggedIn });
});

router.get("/write", (req, res, next) => {
  const loggedIn = req.session.isLoggedIn;
  res.render("screens/board/write", { loggedIn });
  const inserQuery = `
    INSERT INTO boards (
      title,
      content,
      createdAt,
      updatedAt,
      userId
    ) VALUES (
      "${req.body.input_title}",
      "${req.body.input_content}",
      now(),
      now(),
      ${req.session.userId}
    )
  `;

  try {
    db.query(inserQuery, (err, rows) => {
      if (err) {
        console.error(err);
        return res.redirect("/board/list");
      }

      return res.redirect("/board/list");
    });
  } catch (error) {
    console.error(error);
    return res.status(400).send("게시글 작성에 실패했습니다.");
  }
});

module.exports = router;
