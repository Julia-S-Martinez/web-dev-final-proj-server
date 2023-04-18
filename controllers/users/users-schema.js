import mongoose from "mongoose";

const usersSchema = mongoose.Schema({
    profilePicture: String,
    username: {type: String, required: true},
    password: {type: String, required: true},
    following : {type: [String], required: true, default: []},
    followers : {type: [String], required: true, default: []},
    role : {type: "String", required: true, enum: ['LISTENER', 'ARTIST']},
    // unique for Artists
    created_songs : {type: [String], required : function () {
            return this.role === "ARTIST";
        },
        default : []
    },
    // unique for Listeners, although not enforced
    liked_songs : {type : [String], default : []},
    comments : {type : [String], default : []}
}, {collection: 'Users'});
export default usersSchema;