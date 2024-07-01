import axios from 'axios'
const getBooks = (page: number, limit: number, keyWords: string) => {
    return axios.get("/api/book/getBooks", {
        params: {
            page,
            limit,
            keyWords
        }
    }).then(resp => resp.data.data)
}
const addBook = (obj: Object) => {
    return axios.post("/api/book/addBook", obj, {
        headers: {
            "content-type": "application/json"
        }
    }).then(resp => resp.data)
}
const delBook = (id: number) => {
    return axios.delete(`/api/book/${id}`).then(resp => resp.data)
}
const updateBook = (id: number, obj: Object) => {
    return axios.put(`/api/book/${id}`, obj).then(resp => resp.data)
}

export { getBooks, addBook, delBook, updateBook }