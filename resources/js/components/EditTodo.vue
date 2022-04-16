<template>
    <div>
        <h4 class="text-center">Edit Todo</h4>
        <div class="row">
            <div class="col-md-6">
                <form @submit.prevent="updateTodo">
                    <div class="form-group">
                        <label>Name</label>
                        <input type="text" class="form-control" v-model="todo.name">
                    </div>
                    <button type="submit" class="btn btn-primary">Update Todo</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            todo: {}
        }
    },
    created() {
        this.$axios.get('/sanctum/csrf-cookie').then(response => {
            this.$axios.get(`/api/todos/edit/${this.$route.params.id}`)
                .then(response => {
                    this.todo = response.data;
                })
                .catch(function (error) {
                    console.error(error);
                });
        })
    },
    methods: {
        updateTodo() {
            this.$axios.get('/sanctum/csrf-cookie').then(response => {
                this.$axios.post(`/api/todos/update/${this.$route.params.id}`, this.todo)
                    .then(response => {
                        this.$router.push({name: 'todos'});
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