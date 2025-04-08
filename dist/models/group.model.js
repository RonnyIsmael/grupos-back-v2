import pool from "../config/db.config.js";
class GroupModel {
    async countUsersByGroupId(groupId) {
        const { rows } = await pool.query("select count(*) num_users from rel_user_game_group rugg where rugg.group_id = $1;", [groupId]);
        return rows[0];
    }
    async getGroupById(id) {
        const { rows } = await pool.query("select gg.id, gg.name , gg.user_id, a.url avatar, s.name as sport from  game_group gg, avatar a, sport s where gg.avatar_id = a.id and gg.sport_id = s.id and  gg.id = $1;", [id]);
        return rows[0];
    }
    async addGroup(group) {
        const { name, owner, avatar, sport_id } = group;
        const resAvatar = await pool.query('insert into public.avatar (url) values ($1) RETURNING*', [avatar]);
        const createdAvatar = resAvatar.rows[0];
        const { rows } = await pool.query('INSERT INTO public.game_group ( name, user_id, avatar_id, sport_id) VALUES( $1, $2, $3, $4) RETURNING*', [name, owner, createdAvatar.id, sport_id]);
        await pool.query('insert into public.rel_user_game_group (user_id, group_id) values($1, $2)', [owner, rows[0].id]);
        return rows[0];
    }
    async addUserToGroup(user_id, group_id) {
        const { rows } = await pool.query('insert into public.rel_user_game_group (user_id, group_id) values($1, $2)', [user_id, group_id]);
        let inserted = rows[0];
        return inserted;
    }
}
export default new GroupModel();
