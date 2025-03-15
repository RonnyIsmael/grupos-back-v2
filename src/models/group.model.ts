import pool from "../config/db.config.ts";
import { CountUser } from "../interfaces/group.interface.ts";

class GroupModel {
    async countUsersByGroupId(groupId: number): Promise<CountUser> {
        const { rows } = await pool.query("select count(*) num_users from rel_user_game_group rugg where rugg.group_id = $1;",
            [groupId]
        );
        return rows[0];
    }
}

export default new GroupModel();
