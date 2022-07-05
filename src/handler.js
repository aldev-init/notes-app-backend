const { nanoid } = require('nanoid');
const notes = require("./notes");

const addNotesHandler = (request,h) =>{
    const {title,tags,body} = request.payload;
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newNote = {
        id,
        title,
        tags,
        body,
        createdAt,
        updatedAt,
    }

    notes.push(newNote);

    //apakah data sudah masuk ke array notes
    const isSuccess = notes.filter((note) => note.id === id).length > 0;   

    if(isSuccess){
        const response = h.response({
            status:'success',
            message: 'Catatan Berhasil Ditambahkan',
            data:{
                noteid: id
            }
        });
        response.code(201);
        return response;
    }

    const response = h.response({
        status:'Fail',
        message: 'Catatan Gagal Ditambahkan',
    });

    response.code(500);
    return response;
}

const getAllNotesHandler = () =>({
    status:'Success',
    data:{
        notes,
    },
});

const getNoteById = (request,h) =>{
    const {id} = request.params;
    const note = notes.filter((n)=> n.id = id)[0];
    if(!note !== undefined){
        return{
            status:'Success',
            data:{
                note,
            },
        };
    }

    const response = h.response({
        status: 'fail',
        message: 'Catatan tidak ditemukan',
    });
    response.code(404);
    return response;

}

const editNoteById = (request,h) =>{
    const {id} = request.params;
    const {title,tags,body} = request.payload;
    const updateAt = new Date().toISOString();

    const index = notes.findIndex((note) => note.id === id);
    if (index !== -1) {
        notes[index] = {
        ...notes[index],
        title,
        tags,
        body,
        updateAt,
        };
        const response = h.response({
        status: 'success',
        message: 'Catatan berhasil diperbarui',
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui catatan. Id tidak ditemukan',
    });

    response.code(404);
    return response;
}

const deleteNoteById = (request,h) =>{
    const {id} = request.params;
    
    const index = notes.findIndex((note) => note.id === id);

    if (index !== -1) {
        notes.splice(index, 1);
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil dihapus',
        });
        response.code(200);
        return response;
    }
}

module.exports = {addNotesHandler,getAllNotesHandler,getNoteById,editNoteById,deleteNoteById};