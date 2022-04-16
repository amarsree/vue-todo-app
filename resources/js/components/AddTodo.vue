<template>
    <div>
        <h4 class="text-center">Add Todo</h4>
        <div class="row">
            <div class="col-md-6">
                <form @submit.prevent="addTodo">
                    <div class="form-group">
                        <label>Name</label>
                        <input type="text" class="form-control" v-model="Todo.name">
                    </div>
                    <button type="submit" class="btn btn-primary">Add Todo</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            Todo: {}
        }
    },
    methods: {
        addTodo() {
            this.$axios.get('/sanctum/csrf-cookie').then(response => {
                this.$axios.post('/api/todos/add', this.Todo)
                    .then(response => {
                        this.$router.push({name: 'todos'})
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