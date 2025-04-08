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
        const rowsInsertado = await pool.query("SELECT u.*, a.url as avatar FROM users u, avatar a where u.avatar_id = a.id and u.id = $1", [
            rows[0].id,
        ]);
        return rowsInsertado.rows[0];
    }
    async findByEmail(email) {
        const { rows } = await pool.query("SELECT u.*, a.url as avatar FROM users u, avatar a where u.avatar_id = a.id and u.email = $1", [
            email,
        ]);
        return rows[0] || null;
    }
    async findById(id) {
        const { rows } = await pool.query("SELECT u.*, a.url as avatar FROM users u, avatar a where u.avatar_id = a.id and u.id = $1", [
            id,
        ]);
        return rows[0] || null;
    }
    async findGroupsbyUserId(userId) {
        const { rows } = await pool.query("select rugg.*, gg.name group_name, gg.user_id as owner_group , a.url avatar_group, s.name sport_group from rel_user_game_group rugg, game_group gg, avatar a, sport s  where rugg.group_id = gg.id and gg.avatar_id = a.id and s.id = gg.sport_id and rugg.user_id = $1;", [userId]);
        return rows;
    }
    async findUserFriends(user_id) {
        const { rows } = await pool.query("select  u.id, u.user_name, a.url avatar  from rel_user_user ruu, users u, avatar a  where a.id = u.avatar_id and  ruu.userfriend = u.id and ruu.userid = $1;", [user_id]);
        return rows;
    }
}
export default new UserModel();
