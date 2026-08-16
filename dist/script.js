const contactsContainer = document.getElementById("contact-lists-container");
const name_input = document.querySelector(".name_input");
const number_input = document.querySelector(".number_input");
// localStorage.setItem("contacts", JSON.stringify(contact_lists));
const savedContacts = localStorage.getItem("contacts");
const localstorage_contacts = savedContacts ? JSON.parse(savedContacts) : [];
const contacts = [...localstorage_contacts].sort((a, b) => {
    const nameA = a.name.toUpperCase(); // ignore upper and lowercase
    const nameB = b.name.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
        return -1;
    }
    if (nameA > nameB) {
        return 1;
    }
    // names must be equal
    return 0;
});
console.log(contacts);
function createContactBlock(tagName) {
    return document.createElement(tagName);
}
const allContacts = (contacts) => {
    if (contactsContainer) {
        contactsContainer.innerHTML = "";
    }
    let lists = contacts.map(({ name, phone, picture }) => {
        const list = createContactBlock("div");
        const contactDetails = createContactBlock("div");
        const contactName = createContactBlock("p");
        const contactNumber = createContactBlock("p");
        const contactPic = createContactBlock("img");
        list.classList.add("list");
        contactDetails.classList.add("contact-details");
        contactName.className = "contact-name";
        contactNumber.className = "contact-number";
        contactName.innerHTML = name;
        contactNumber.innerHTML = phone;
        contactPic.src = picture;
        list.appendChild(contactPic);
        contactDetails.appendChild(contactName);
        contactDetails.appendChild(contactNumber);
        list.appendChild(contactDetails);
        contactsContainer?.appendChild(list);
    });
    return lists;
};
allContacts(contacts);
// function to handle duplicated contact_lists
const handle_duplicates = (name, number) => {
    for (const contact of contacts) {
        if (name.toLowerCase() === contact.name.toLowerCase()) {
            if (window.confirm("Contact already Exists, Do you want to update the phone number")) {
                if (contactsContainer) {
                    contactsContainer.innerHTML = "";
                }
                contact.phone = number;
                allContacts(contacts);
            }
            return true;
        }
    }
    return false;
};
// fn for adding contact
function add_contact(name, number) {
    const lastContactIndex = contacts[contacts.length - 1];
    const newContactIndex = lastContactIndex.id + 1;
    console.log(lastContactIndex);
    console.log(newContactIndex);
    if (!handle_duplicates(name, number)) {
        contacts.push({
            id: newContactIndex,
            name: name,
            phone: number,
            picture: `https://i.pravatar.cc/150?img=${newContactIndex}`,
        });
        localStorage.setItem("contacts", JSON.stringify(contacts));
        if (contactsContainer) {
            contactsContainer.innerHTML = "";
        }
        allContacts(contacts);
    }
    console.log(contacts);
}
const closeModal = document.querySelector(".close-add-contact-btn");
const contactPanel = document.querySelector(".add-contact-panel");
const openModal = document.querySelector(".add-btn");
closeModal?.addEventListener("click", () => {
    if (name_input && number_input) {
        name_input.value = "";
        number_input.value = "";
    }
    contactPanel?.classList.remove("open");
});
openModal?.addEventListener("click", () => {
    contactPanel?.classList.add("open");
});
//  getting the input
const add_new_contact = () => {
    if (name_input && number_input) {
        if (name_input.value.trim() !== "" && number_input.value.trim() !== "") {
            console.log(name_input.value, number_input.value);
            let new_name = name_input.value;
            let new_number = number_input.value;
            add_contact(new_name, new_number);
            name_input.value = "";
            number_input.value = "";
            contactPanel?.classList.remove("open");
        }
        else
            alert("Both the name and the number must be valid");
    }
};
const add_new_contact_btn = document.querySelector(".add-contact-btn");
add_new_contact_btn?.addEventListener("click", () => {
    add_new_contact();
});
// SEARCH FN
const search_bar = document.querySelector(".search-input");
const queryList = (query) => {
    const normalizedQuery = query?.toLowerCase() ?? "";
    const qResult = contacts.filter((contact) => contact.name.toLowerCase().includes(normalizedQuery));
    return qResult;
};
search_bar?.addEventListener("input", (event) => {
    const target = event.target;
    const queried_contacts = queryList(target?.value);
    if (queried_contacts.length > 0) {
        allContacts(queried_contacts);
    }
    else {
        if (contactsContainer) {
            contactsContainer.innerHTML = "";
        }
        const noContact = document.createElement("div");
        noContact.innerHTML = "No matching Contact";
        contactsContainer?.appendChild(noContact);
        console.log(contactsContainer);
    }
});
export {};
//# sourceMappingURL=script.js.map