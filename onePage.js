function getPostsByUser(un){

    return new Promise(function(resolve,reject){

      $.get('https://jsonplaceholder.typicode.com/users', function(users){

        users.forEach(function(user){

          if (user.username.trim()==un){
            resolve(un);
          }
        });
      });
    })
}

function tagRep(){
  $("div").replaceWith("<h1 id='title'></h1><h2>POST TITLES</h2><ul id='postList'></ul><h2>ALBUM TITLES</h2><ul id='albumList'></ul>")
}

function err(){
  console.log("Username does not exist");
}

function getName(s){
  return new Promise(function(resolve,reject){
    var t=$('h1#title');

    $.get('https://jsonplaceholder.typicode.com/users?username='+ s, function(users){
      users.forEach(function(user){
        var g=t.text(user.name);
        t.append(g);
        var a=user.id;
        sessionStorage.setItem('userID',a);
      })
    })
  })
}

function getTitles(ident){
  return new Promise(function(resolve,reject){
    var list1=$('ul#postList');
      $.get('https://jsonplaceholder.typicode.com/posts?userId=' + ident, function(posts){

           posts.forEach(function(postsForId){
              if(postsForId){
              var li1=$('<li></li>');
              li1.text(postsForId.title);
              list1.append(li1);
            }
           })
      })
  })
}

function getAlbums(ident){
  return new Promise(function(resolve,reject){
    var list2=$('ul#albumList');
      $.get('https://jsonplaceholder.typicode.com/albums?userId='+ident, function(albums){

           albums.forEach(function(albumsForId){
              if(albumsForId){
              var li2=$('<li></li>');
              li2.text(albumsForId.title);
              list2.append(li2);
            }
            })
      })
  })
}


$(document).ready(()=>{
  document.getElementById("btn").addEventListener("click",function(ev){

    ev.preventDefault();

    var un=document.getElementById("username").value;
    var ident=sessionStorage.getItem('userID');

  //  sessionStorage.setItem('user_name', un);

    getPostsByUser(un)
    .catch(err)
    .then(tagRep())
    .then(Promise.all([getName(un),getTitles(ident),getAlbums(ident)]).catch(err));
})
})
