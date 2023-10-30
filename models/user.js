// Creating Model
export default (sequelize, Sequelize) => {
    const users = sequelize.define('user', {
        id: {
            type: Sequelize.UUID, // Change to UUID if needed
            primaryKey: true,
            allowNull: false,
            defaultValue: Sequelize.UUIDV4, // Generate a default UUID
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true, // Ensure email uniqueness
            validate: {
                isEmail: true, // Add email validation
            },
        },
        phone:{
            type: Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING, // Correct data type for password
            allowNull: false
        },
        role: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 2
        },
        otp: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        otp_expiration_time: {
            type: Sequelize.BIGINT, // Store time in milliseconds
            allowNull: false,
        },
    });
    return users;
}