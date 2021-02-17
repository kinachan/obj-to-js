
const isJsonFormat = (string) => {
  if (/^[\],:{}\s]*$/.test(string.replace(/\\["\\\/bfnrtu]/g, '@').
  replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
  replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
    return true;
  }
  return false;
}

const onPaste = () => {
  setTimeout(() => {
    successFunction();
  }, 500);
}

const validError = (data, name) => {
  const targetElement = jsonFieldError;
  if (!data.result) {
    targetElement.classList.add('visible');
    return false;
  }
  targetElement.classList.remove('visible');
  return true;
}

const isEmptyObject = (obj) => Object.keys(obj).length === 0;

const createHtmlElement = (data) => {
  let childElement = '';
  Object.keys(data).forEach((key) => {
    const value = data[key];
    if (isObject(value)) {
      childElement += `<h6>${key}</h6>`
      childElement += `<ul>${createHtmlElement(data[key])}</ul>`;
    } else {
      const isOld = key === 'oldVal';
      const label = isOld ? '旧' : '新';

      const newClass = isOld ? 'oldval' : 'newval'
      childElement += `<li class="${newClass}">${label}：${data[key]}</li>`
    }
  });
  return childElement;
}

const createHtmlElements = (data) => {
  const json = JSON.stringify(data, null, 2);
  const element = json
    .replace(/"/g, "'")
    .replace(/'(.*)':/g, '$1');

  list.innerHTML = element;
};


// Array
const isArray = item => Object.prototype.toString.call(item) === '[object Array]';
const isObject = (item) => typeof item === 'object' && item !== null && !isArray(item);

const renderArray = (arr) => {
  for (item of arr) {
    if (isArray(item)) {
      
    }
  }
}

const JSONTryParse = (string) => {
  try {
    const object = JSON.parse(string);
    return object;
  } catch(e) {
    return null;
  }
}

const canChangeFormat = (value) => {
  if (value === '' ) return {result: false, value: null }

  if (!isJsonFormat(value)) {
    return {result: false, value: null};
  }
  const json = JSONTryParse(value);
  return {result: json !== null, value: json};
}

const successFunction = () => {
  const jsonValue = jsonField.value;

  const formatValue = canChangeFormat(jsonValue);

  if (!validError(formatValue, 'jsonFieldError')) {
    return;
  }
  createHtmlElements(formatValue.value);
}

const jsonField = document.getElementById('JSONField');
const jsonFieldError = document.getElementById('jsonFieldError');

jsonField.addEventListener('change', e => {
  onPaste(e, jsonFieldError);
});
