var emojis = require('emojilib')
var index = buildIndex(emojis)
var searchInput = document.querySelector('.js-search')

searchInput.focus()
searchInput.addEventListener('keyup', function() {
  search(this.value)
})

function search (query) {
  document.querySelector('.js-outcome').innerHTML =

  (Object.keys(index).filter(function matchQuery (keyword) {
    return keyword.match(query)
  })).map(function(keyword) {
    return index[keyword]
  }).join().split(',').filter(function filterUniqueResults (emoji, pos, arr) {
    return emoji && arr.indexOf(emoji) === pos
  }).map(function generateMarkup (name) {
    var result = '<div class="result"><span class="emoji">' + (emojis[name]['char'] || '--') + '</span>'
    result += '<input readonly type="text" class="code" value=":' + name + ':"></div>'
    return result
  }).join('')
}

function buildIndex (emojis) {
  var keywords = {}
  Object.keys(emojis).map(function (name) {
    var words = emojis[name]["keywords"]
    words.push(name)

    words.forEach(function(word) {
      if (keywords[word] && keywords[word].indexOf(name) < 0) {
        keywords[word].push(name)
      } else {
        keywords[word] = [name]
      }
    })
  })
  return keywords
}