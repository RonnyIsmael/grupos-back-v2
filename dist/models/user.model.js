import pool from "../config/db.config.js";
import { genSalt, hash } from "bcrypt-ts";
class UserModel {
    async findAll() {
        const { rows } = await pool.query("SELECT * FROM USERS");
        return rows;
    }
    async create(user) {
        const salt = await genSalt(Number(process.env.SALT || 10));
        const { user_name, email, password } = user;
        const hashedPassword = await hash(password, salt);
        const { rows } = await pool.query("INSERT INTO users (user_name, email, password) VALUES ($1, $2, $3) RETURNING *", [user_name, email, hashedPassword]);
        return rows[0];
    }
    async findByEmail(email) {
        const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [
            email,
        ]);
        return rows[0] || null;
    }
    async findById(id) {
        const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
            id,
        ]);
        return rows[0] || null;
    }
    async findGroupsbyUserId(userId) {
        const { rows } = await pool.query("select rugg.*, gg.name group_name, a.url  avatar_group from rel_user_game_group rugg, game_group gg, avatar a  where rugg.group_id = gg.id and gg.avatar_id = a.id and  rugg.user_id = $1;", [userId]);
        return rows;
    }
}
export default new UserModel();
