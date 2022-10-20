import { DataTypes as Sequelize } from "sequelize";

const StaffModel = {
  id: {
    primaryKey: true,
    allowNull: false,
    type: Sequelize.INTEGER,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
  updateAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
};

const StaffOptions = {
  timestamps: false,
  schema: "public",
  freezeTableName: true,
};

export const getModel = (seq) => {
  return seq.define("Staff", StaffModel, StaffOptions);
};
