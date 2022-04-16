<template>
    <div>
        <h4 class="text-center">All Todos</h4><br/>
        <table class="table table-bordered">
            <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(todo,index) in todos" :key="todo.id">
                <td>{{ index+1 }}</td>
                <td>{{ todo.name }}</td>
                <td>{{ todo.created_at }}</td>
                <td>{{ todo.updated_at }}</td>
                <td>
                    <div class="btn-group" role="group">
                        <router-link :to="{name: 'edittodo', params: { id: todo.id }}" class="btn btn-primary">Edit
                        </router-link>
                        <button class="btn btn-danger" @click="deletetodo(todo.id)">Delete</button>
                       
                    </div>
                </td>
            </tr>
            </tbody>
        </table>

        <button type="button" class="btn btn-info" @click="this.$router.push('/todos/add')">Add Todo</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            todos: []
        }
    },
    created() {
       this.$axios.get('/sanctum/csrf-cookie').then(response => {
            this.$axios.get('/api/todos')
                .then(response => {
                    this.todos = response.data;
                    console.log(response.data)
                })
                .catch(function (error) {
                    console.error(error);
                });
        })
    },
    methods: {
        deletetodo(id) {
            this.$axios.get('/sanctum/csrf-cookie').then(response => {
                this.$axios.delete(`/api/todos/delete/${id}`)
                    .then(response => {
                        let i = this.todos.map(item => item.id).indexOf(id); // find index of your object
                        this.todos.splice(i, 1)
                    })
                    .catch(function (error) {
                        console.error(error);
                    });
            })
        }
    },
    beforeRouteEnter(to, from, next) {
        if (!window.Laravel.isLoggedin) {
            window.location.href = "/";
        }
        next();
    }
}
</script>