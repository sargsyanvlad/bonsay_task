export const StaffValidator = {
  signup: {
    email: [{ type: "string" }, { type: "email" }],
    name: [{ type: "string" }],
    password: { type: "string", min: 8, max: 15 },
  },
};
