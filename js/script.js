var form = document.getElementById("todo_form");
var full_name = document.getElementById("full_name");
var email_address = document.getElementById("email_address");
var phone_number = document.getElementById("phone_number");
var list_id = document.getElementById("list_id");
var form_submit = document.getElementById("form_submit");
var error_message = document.getElementById("error_message");
var display_list = document.getElementById("display_list");
var add_button = document.getElementById('add_button');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    if(form_submit.value == "add"){
        accepted_data();
    }else{
        data_to_update();
    }
});

// Create empty object with let variable as it is block scoped
let data = {};
let accepted_data = () => {
    // Retrieve the item using getItem
    const todo_list_array = localStorage.getItem('todo_list');
    // Check if the array exists in local storage and Parse the JSON string into a JavaScript array
    let existing_array = todo_list_array ? JSON.parse(todo_list_array) : [];
    
    if(existing_array !== null && existing_array !== "" && existing_array.length !== 0){
        const lastElement = existing_array[existing_array.length-1];
        let last_id = lastElement.id;
        last_id++;

        data['id'] = last_id;
        data['full_name'] = full_name.value;
        data['email_address'] = email_address.value;
        data['phone_number'] = phone_number.value;  

        // Push the new object into the array
        existing_array.push(data);

        // Convert the updated array back to a JSON string
        localStorage.setItem('todo_list', JSON.stringify(existing_array));
    }
    else
    {
        // Create empty array
        const existing_array = [];
        let first_id = 1;
        data['id'] = first_id;
        data['full_name'] = full_name.value;
        data['email_address'] = email_address.value;
        data['phone_number'] = phone_number.value;  
        // Push the new object into the array
        existing_array.push(data);

        // Convert the updated array back to a JSON string
        localStorage.setItem('todo_list', JSON.stringify(existing_array));
    } 
    create_list();
    reset_form();
};

let create_list = () => {
    const local_data = localStorage.getItem('todo_list');
    const local_array = local_data ? JSON.parse(local_data) : [];
    if(local_array.length !== 0){
        display_list.innerHTML = "";
        local_array.forEach(obj => {
            display_list.innerHTML += `
                <div class="display-list">
                    <p>Full Name: <span>${obj.full_name}</span></p>
                    <p>Email Address: <span>${obj.email_address}</span></p>
                    <p>Phone Number: <span>${obj.phone_number}</span> &nbsp;&nbsp; <i onClick="edit_list(this,${obj.id});" class="fa fa-edit cursor-pointer"></i> &nbsp; <i onClick="delete_list(this,${obj.id});" class="fa fa-trash cursor-pointer"></i></p>
                </div>
            `;
        });
    }
};
create_list();

let reset_form = () => {
    if(add_button) {
        add_button.style.display = 'none';
    }
    form.reset();
    list_id.value = "";
    form_submit.value = 'add';
    form_submit.innerHTML = 'Add';                
}; 

let add_button_function = () => {
    form.reset();
    list_id.value = "";
    form_submit.value = 'add';
    form_submit.innerHTML = 'Add'; 
    if(add_button) {
        add_button.style.display = 'none';
    }               
};   

let delete_list = (e,id) => {
    e.parentElement.parentElement.remove();
    let array_id = id;
    const local_data = localStorage.getItem('todo_list');
    let local_array = JSON.parse(local_data);
    // ID of the object you want to remove
    const objectIdToRemove = array_id;

    // Use the filter method to create a new array without the specified object
    local_array = local_array.filter(obj => obj.id !== objectIdToRemove);
    localStorage.setItem('todo_list', JSON.stringify(local_array));

};

let edit_list = (e,id) => {
    let array_id = id;
    const local_data = localStorage.getItem('todo_list');
    let local_array = JSON.parse(local_data);
    
    editable_array = local_array.find(obj => obj.id === array_id);
    full_name.value = editable_array.full_name;
    email_address.value = editable_array.email_address;
    phone_number.value = editable_array.phone_number;
    list_id.value = editable_array.id;
    form_submit.value = 'update';
    form_submit.innerHTML = 'Update';
    add_button.style.display = 'block';
};

let data_to_update = () => {
    // Retrieve the item using getItem
    const todo_list_array = localStorage.getItem('todo_list');
    // Check if the array exists in local storage and Parse the JSON string into a JavaScript array
    let existing_array = JSON.parse(todo_list_array); 

    if(existing_array !== null && existing_array !== "" && existing_array.length !== 0){                    
        const id_to_update = parseInt(list_id.value);
        const updated_data = {};
        updated_data['id'] = id_to_update;
        updated_data['full_name'] = full_name.value;
        updated_data['email_address'] = email_address.value;
        updated_data['phone_number'] = phone_number.value; 

        existing_array = existing_array.map(obj => obj.id === id_to_update ? updated_data : obj);

        // Convert the updated array back to a JSON string
        localStorage.setItem('todo_list', JSON.stringify(existing_array));
        create_list();
        reset_form();
    }
};