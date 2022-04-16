<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Todo;

class TodoController extends Controller
{
   
    // all todos
    public function index()
    {
        $todos = Todo::where("user_id",\Auth::id())->get()->toArray();
        return array_reverse($todos);
    }

    // add todo
    public function add(Request $request)
    {
        $todo = new Todo([
            'name' => $request->name,
            'user_id' => \Auth::id(),
        ]);
        $todo->save();

        return response()->json('The task added successfully');
    }

    // edit book
    public function edit($id)
    {
        $book = Todo::find($id);
        return response()->json($book);
    }

    // update book
    public function update($id, Request $request)
    {
        $book = Todo::find($id);
        $book->update($request->all());

        return response()->json('The book successfully updated');
    }

    // delete book
    public function delete($id)
    {
        $book = Todo::find($id);
        $book->delete();

        return response()->json('The book successfully deleted');
    }
}
