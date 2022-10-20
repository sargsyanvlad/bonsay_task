import { app } from "./server";

const port = process.env.APP_PORT;

export const bootsrap = () => {
  try {
    app.listen(port);
  } catch (error) {
    console.error(error);
  }
};

bootsrap();
