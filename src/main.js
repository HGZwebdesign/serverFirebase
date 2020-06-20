import * as firebase from 'firebase'
import './main.scss'

$(() => {
  console.log("JS ready...");

  // Initialize Firebase

  let config = {
    apiKey: "AIzaSyAU1d8hVjypJ59SgL9B-QogXeSWLfwZ2-E",
    authDomain: "w3ii-tutorial.firebaseapp.com",
    databaseURL: "https://w3ii-tutorial.firebaseio.com",
    projectId: "w3ii-tutorial",
    storageBucket: "w3ii-tutorial.appspot.com",
    messagingSenderId: "891091656975"
  };
  firebase.initializeApp(config);

  // Create variables

  const form = $('form');
  const sushiListButton = $('#sushi-list-button');
  const sushiAddButton = $('#sushi-add-button');
  const list = $('#sushi-list');
  const myUrl = "http://localhost:3000/sushiTypeDescription";

  /**
 * -----------------------------------------------------------------------
 *                           Function: show list of elements
 * -----------------------------------------------------------------------
 */

  const showList = () => {

    let ref = firebase.database().ref('sushi/');

    ref.on("value", (resp) => {

      list.empty();
      resp.forEach((e, i) => {

        let element = $('<div>').attr("data-id", e.key);
        let title = $('<h2>').text(e.val().name).attr("contenteditable", 'false');
        let p = $('<p>').text(e.val().description).attr("contenteditable", 'false');

        let del = $('<button>', {class: "delete"}).text("Usuń");
        let edit = $('<button>', {class: "edit"}).text("Edytuj");

        if (!e.val().editable) {
          del.attr("disabled", true);
          edit.attr("disabled", true);
        }

        element.append(del).append(edit).append(title).append(p);
        list.append(element);
      });

    }, (error) => {
      console.log("Error: " + error.code);
    });
  }

  // Button

  sushiListButton.on('click', (e) => {
    showList();
  })

  /**
 * -----------------------------------------------------------------------
 *                         Function: Add new element
 * -----------------------------------------------------------------------
 */
  const addElement = () => {

    let getName = $('#get-name').val();
    let getDescription = $('#get-description').val();
    // let getSize = $('#get-size').val();

    let ref2 = firebase.database().ref('sushi/');

    ref2.push({name: getName, description: getDescription, size: 2, editable: true, id: firebase.database.ServerValue.TIMESTAMP});

    showList();
  }

  // Button

  form.on("submit", function (e) {
    e.preventDefault();
    addElement();
  });

  /**
 * -----------------------------------------------------------------------
 *                       Function: Delete element
 * -----------------------------------------------------------------------
 */

  const deleteElement = (id) => {

    let ref3 = firebase.database().ref('sushi/').child(id).remove();

  }

  // Button

  $('body').on("click", ".delete", function (e) {
    deleteElement($(this).parent().data("id"));
  });

  /**
 * -----------------------------------------------------------------------
 *                          Function: Edit element
 * -----------------------------------------------------------------------
 */

  const editElement = (element) => {

    let title = element.find("h2").text();
    let p = element.find("p").text();

    let ref4 = firebase.database().ref("sushi/" + element.data('id'));
    ref4.update({name: title, description: p});

    showList();
  }

  // Button

  $("body").on("click", ".edit", function () {

    let element = $(this).parent();
    let title = element.find('h2');
    let p = element.find('p');

    if (title.attr("contenteditable") == "false") {

      title.attr("contenteditable", true).addClass('highlighted');
      p.attr("contenteditable", true).addClass('highlighted');
      $(this).text("Zatwierdź");

    } else {

      editElement(element);
      title.attr("contenteditable", false).removeClass('highlighted');
      p.attr("contenteditable", false).removeClass('highlighted');
      $(this).text("Edytuj");

    };
  })

})
