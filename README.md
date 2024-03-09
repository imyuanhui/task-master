# Task Master

A single page app helping manage all the tasks.

Manage tasks simply and conveniently.

## Basic Functions

By using this app, you can:

### add, remove and edit any to-dos

### review to-do list clearly

All to-dos are displayed by date.

## Extra Functions

In addition to basic functions, you can also:

### manage tasks by category

All tasks can be categorized by type.

### track the task step by step

All tasks can be broke into smaller to-dos.

### customize task categories

Freely add and remove task categories.

### filter to-do list simply

All to-dos can be filtered according to "completed"/"incompleted" status.

_note: below are the steps that how I build this app_

## Development process

### step1: requirement analysis

All the user stories and page draft are provied by ifeBaidu.

### step2: database content determination

Need three data tables for categories, tasks, and to-do items.

#### category table

Include id and title.

#### task table

Include id, title and catId.

#### to-do table

Include id, title, date, description, status and taskId.

### step3: app framework design

#### Main Components

- Header

- CatList

1. CatItem
2. RemoveBtn
3. AddCatBtn

- TaskList

1. TaskItem
2. RemoveBtn

- TodoList

1. FilterBtn
2. TodoItem
3. AddTaskBtn

- TodoView

1. CheckedBtn
2. EditBtn
3. RemoveBtn
4. TodoDisplay

- TodoEditor

1. DateEditor
2. DiscriptionEditor
3. ConfirmBtn
4. CancelBtn

- FloatingWindow

1. TitleInput
2. ConfirmBtn
3. CancelBtn

#### Function components

- UpdateData
