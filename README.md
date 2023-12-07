# Turinys
- [Puslapis](#Puslapis)
- [API Dokumentacija](#API-Dokumentacija)
- [FIGMA Naudotojo sąsajos projektas](#FIGMA-Naudotojo-sąsajos-projektas)
- [Ataskaita](#Ataskaita)

# Puslapis
[Rentee](https://stpp-rent.vercel.app/)

# FIGMA Naudotojo sąsajos projektas
[FIGMA](https://www.figma.com/file/D376Tfs4MJuiCUYrofR7YY/Untitled?type=design&node-id=0%3A1&mode=design&t=IZL8slavNShk2fyZ-1)

# Ataskaita
[GoogleDocs](https://docs.google.com/document/d/1Cihlgq599CskqwEBOhpkjQYDgdA2LxmfI7oXu7k_e6Q/edit?usp=sharing)

# API Dokumentacija
[SwaggerUI](https://stpp-rent.vercel.app/swagger/index.html)

<h1 id="stpp-rentee-api">STPP Rentee API v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

<h1 id="stpp-rentee-api-auth">Auth</h1>

`POST /api/v1/auth/login`

Logs in a user (returns http-only cookies with the access and refresh tokens).

> Body parameter

```json
{
  "username": "user1",
  "password": "labas123"
}
```

<h3 id="post__api_v1_auth_login-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|false|none|
|» username|body|string|true|none|
|» password|body|string|true|none|

> Example responses

> 200 Response

```json
{
  "message": "Log in successful!",
  "role": "rentee"
}
```

<h3 id="post__api_v1_auth_login-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Log in successful!|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|The request body is invalid. Message provided in the response body.|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Invalid username or password. Please check your credentials and try again.|None|
|503|[Service Unavailable](https://tools.ietf.org/html/rfc7231#section-6.6.4)|Sorry, we are currently experiencing technical difficulties. Please try again later.|None|

<h3 id="post__api_v1_auth_login-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» message|string|false|none|none|
|» role|string|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## delete__api_v1_auth_logout

> Code samples

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/api/v1/auth/logout',
{
  method: 'DELETE',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`DELETE /api/v1/auth/logout`

Logs out the user (deletes the access and refresh token cookies).

> Example responses

> 200 Response

```json
{
  "message": "Log out successful!"
}
```

<h3 id="delete__api_v1_auth_logout-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Log out successful!|Inline|

<h3 id="delete__api_v1_auth_logout-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» message|string|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## post__api_v1_auth_register

> Code samples

```javascript
const inputBody = '{
  "username": "user3",
  "password": "labas123",
  "role": "renter"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/api/v1/auth/register',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /api/v1/auth/register`

Registers a user (returns http-only cookies with the access and refresh tokens).

> Body parameter

```json
{
  "username": "user3",
  "password": "labas123",
  "role": "renter"
}
```

<h3 id="post__api_v1_auth_register-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|false|none|
|» username|body|string|true|none|
|» password|body|string|true|none|
|» role|body|string|true|none|

> Example responses

> 200 Response

```json
{
  "message": "Registration successful!",
  "role": "rentee"
}
```

<h3 id="post__api_v1_auth_register-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Registration successful!|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|The data provided in the request body is invalid. Please check your registration information and try again.|None|
|409|[Conflict](https://tools.ietf.org/html/rfc7231#section-6.5.8)|The requested username is already taken. Please choose a different username.|None|
|503|[Service Unavailable](https://tools.ietf.org/html/rfc7231#section-6.6.4)|Sorry, we are currently experiencing technical difficulties. Please try again later.|None|

<h3 id="post__api_v1_auth_register-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» message|string|false|none|none|
|» role|string|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="stpp-rentee-api-houses">Houses</h1>

## get__api_v1_houses_{id}

> Code samples

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/api/v1/houses/{id}',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/v1/houses/{id}`

Gets a single house.

<h3 id="get__api_v1_houses_{id}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|integer|true|none|

> Example responses

> 200 Response

```json
{
  "name": "BAHAR─░YE ERASMUS HOUSE",
  "region": "KADIK├ûY",
  "district": "OSMANA─₧A",
  "location_description": "*omitted*",
  "wifi_speed": 50,
  "image_url": "https://ghryg4oekbndllfk.public.blob.vercel-storage.com/banner-cIMQn3oWYmBK2lWw1mtF19WSbxc7ec.webp"
}
```

<h3 id="get__api_v1_houses_{id}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Gets a single house.|Inline|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|The house with the specified id does not exist.|None|
|503|[Service Unavailable](https://tools.ietf.org/html/rfc7231#section-6.6.4)|Sorry, we are currently experiencing technical difficulties. Please try again later.|None|

<h3 id="get__api_v1_houses_{id}-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» name|string|false|none|none|
|» region|string|false|none|none|
|» district|string|false|none|none|
|» location_description|string|false|none|none|
|» wifi_speed|number|false|none|none|
|» image_url|string|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## patch__api_v1_houses_{id}

> Code samples

```javascript
const inputBody = '{
  "name": "Butas Kaune 1",
  "region": "Kaunas",
  "district": "┼áilainiai",
  "location_description": "Arti parduotuv─ù.",
  "wifi_speed": "20",
  "image": "string"
}';
const headers = {
  'Content-Type':'multipart/form-data',
  'Accept':'application/json'
};

fetch('/api/v1/houses/{id}',
{
  method: 'PATCH',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`PATCH /api/v1/houses/{id}`

Updates a house listing (requires to be logged-in as a renter that created the house).

> Body parameter

```yaml
name: Butas Kaune 1
region: Kaunas
district: ┼áilainiai
location_description: Arti parduotuv─ù.
wifi_speed: "20"
image: string

```

<h3 id="patch__api_v1_houses_{id}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|integer|true|none|
|body|body|object|false|none|
|» name|body|string|false|none|
|» region|body|string|false|none|
|» district|body|string|false|none|
|» location_description|body|string|false|none|
|» wifi_speed|body|integer|false|none|
|» image|body|string(binary)|false|none|

> Example responses

> 200 Response

```json
{
  "type": "success",
  "status": 200,
  "data": "*omitted*"
}
```

<h3 id="patch__api_v1_houses_{id}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successfully updated the house listing.|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|The request formData is invalid. Please check your data and try again.|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|User was not logged-in as a renter or is not the one that created the specified house.|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|The house with the specified id does not exist.|None|
|503|[Service Unavailable](https://tools.ietf.org/html/rfc7231#section-6.6.4)|Sorry, we are currently experiencing technical difficulties. Please try again later.|None|

<h3 id="patch__api_v1_houses_{id}-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» type|string|false|none|none|
|» status|number|false|none|none|
|» data|string|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## delete__api_v1_houses_{id}

> Code samples

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/api/v1/houses/{id}',
{
  method: 'DELETE',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`DELETE /api/v1/houses/{id}`

Deletes a house listing (requires to be logged-in as a renter that created the house).

<h3 id="delete__api_v1_houses_{id}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|integer|true|none|

> Example responses

> 200 Response

```json
{
  "message": "Successfully deleted house listing."
}
```

<h3 id="delete__api_v1_houses_{id}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successfully deleted the house listing.|Inline|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|User was not logged-in as a renter or is not the one that created the specified house.|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|The house with the specified id does not exist.|None|
|503|[Service Unavailable](https://tools.ietf.org/html/rfc7231#section-6.6.4)|Sorry, we are currently experiencing technical difficulties. Please try again later.|None|

<h3 id="delete__api_v1_houses_{id}-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» message|string|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## post__api_v1_houses

> Code samples

```javascript
const inputBody = '{
  "name": "Butas Kaune 1",
  "region": "Kaunas",
  "district": "┼áilainiai",
  "location_description": "Arti parduotuv─ù.",
  "wifi_speed": "20",
  "image": "string"
}';
const headers = {
  'Content-Type':'multipart/form-data',
  'Accept':'application/json'
};

fetch('/api/v1/houses',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /api/v1/houses`

Creates a house listing (requires to be logged-in as a renter).

> Body parameter

```yaml
name: Butas Kaune 1
region: Kaunas
district: ┼áilainiai
location_description: Arti parduotuv─ù.
wifi_speed: "20"
image: string

```

<h3 id="post__api_v1_houses-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|false|none|
|» name|body|string|true|none|
|» region|body|string|true|none|
|» district|body|string|true|none|
|» location_description|body|string|true|none|
|» wifi_speed|body|integer|true|none|
|» image|body|string(binary)|true|none|

> Example responses

> 200 Response

```json
{
  "type": "success",
  "status": 200,
  "data": "*omitted*"
}
```

<h3 id="post__api_v1_houses-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successfully created listing!|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|The request formData is invalid. Please check your data and try again.|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Only renters can create houses. Please login.|None|
|503|[Service Unavailable](https://tools.ietf.org/html/rfc7231#section-6.6.4)|Sorry, we are currently experiencing technical difficulties. Please try again later.|None|

<h3 id="post__api_v1_houses-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» type|string|false|none|none|
|» status|number|false|none|none|
|» data|string|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## get__api_v1_houses

> Code samples

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/api/v1/houses',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/v1/houses`

Gets all house listings.

<h3 id="get__api_v1_houses-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|offset|query|integer|false|The number of houses to skip.|
|limit|query|integer|false|The numbers of houses to return|

> Example responses

> 200 Response

```json
[
  {
    "id": 1,
    "name": "BAHARİYE ERASMUS HOUSE",
    "region": "KADIKÖY",
    "district": "OSMANAĞA",
    "location_description": "*omitted*",
    "wifi_speed": 50,
    "image_url": "https://ghryg4oekbndllfk.public.blob.vercel-storage.com/banner-cIMQn3oWYmBK2lWw1mtF19WSbxc7ec.webp"
  }
]
```

<h3 id="get__api_v1_houses-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Returns a list of houses.|Inline|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|No houses exist.|None|
|503|[Service Unavailable](https://tools.ietf.org/html/rfc7231#section-6.6.4)|Sorry, we are currently experiencing technical difficulties. Please try again later.|None|

<h3 id="get__api_v1_houses-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» id|number|false|none|none|
|» name|string|false|none|none|
|» region|string|false|none|none|
|» district|string|false|none|none|
|» location_description|string|false|none|none|
|» wifi_speed|number|false|none|none|
|» image_url|string|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="stpp-rentee-api-common-areas-by-house_id-">Common Areas by {house_id}</h1>

## get__api_v1_houses_{house_id}_common-areas_{area_id}

> Code samples

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/api/v1/houses/{house_id}/common-areas/{area_id}',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/v1/houses/{house_id}/common-areas/{area_id}`

Gets a common area of a house.

<h3 id="get__api_v1_houses_{house_id}_common-areas_{area_id}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|house_id|path|integer|true|none|
|area_id|path|integer|true|none|

> Example responses

> 200 Response

```json
{
  "id": 1,
  "name": "Kitchen."
}
```

<h3 id="get__api_v1_houses_{house_id}_common-areas_{area_id}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Gets a common area of a house.|Inline|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|The common area with the specified id does not exist in the house.|None|
|503|[Service Unavailable](https://tools.ietf.org/html/rfc7231#section-6.6.4)|Sorry, we are currently experiencing technical difficulties. Please try again later.|None|

<h3 id="get__api_v1_houses_{house_id}_common-areas_{area_id}-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» id|number|false|none|none|
|» name|string|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## patch__api_v1_houses_{house_id}_common-areas_{area_id}

> Code samples

```javascript
const inputBody = '{
  "name": "Kitchen."
}';
const headers = {
  'Content-Type':'multipart/form-data',
  'Accept':'application/json'
};

fetch('/api/v1/houses/{house_id}/common-areas/{area_id}',
{
  method: 'PATCH',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`PATCH /api/v1/houses/{house_id}/common-areas/{area_id}`

Updates a common area of a house. (requires to be logged-in as a renter)

> Body parameter

```yaml
name: Kitchen.

```

<h3 id="patch__api_v1_houses_{house_id}_common-areas_{area_id}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|house_id|path|integer|true|none|
|area_id|path|integer|true|none|
|body|body|object|false|none|
|» name|body|string|true|none|

> Example responses

> 200 Response

```json
{
  "type": "success",
  "status": 200,
  "data": "*omitted*"
}
```

<h3 id="patch__api_v1_houses_{house_id}_common-areas_{area_id}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Updated a common area of a house.|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|The request formData is invalid. Please check your data and try again.|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|User not logged-in or the specified common area of the house was created by a different renter.|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|The common area with the specified id does not exist in the house.|None|
|503|[Service Unavailable](https://tools.ietf.org/html/rfc7231#section-6.6.4)|Sorry, we are currently experiencing technical difficulties. Please try again later.|None|

<h3 id="patch__api_v1_houses_{house_id}_common-areas_{area_id}-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» type|string|false|none|none|
|» status|number|false|none|none|
|» data|string|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## delete__api_v1_houses_{house_id}_common-areas_{area_id}

> Code samples

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/api/v1/houses/{house_id}/common-areas/{area_id}',
{
  method: 'DELETE',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`DELETE /api/v1/houses/{house_id}/common-areas/{area_id}`

Deletes a common area of a house. (requires to be logged-in as a renter)

<h3 id="delete__api_v1_houses_{house_id}_common-areas_{area_id}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|house_id|path|integer|true|none|
|area_id|path|integer|true|none|

> Example responses

> 200 Response

```json
{
  "message": "Successfully deleted the common area of the house."
}
```

<h3 id="delete__api_v1_houses_{house_id}_common-areas_{area_id}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Deleted the common area of the house.|Inline|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|User not logged-in or the specified common area of the house was created by a different renter.|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|The common area with the specified id does not exist in the house.|None|
|503|[Service Unavailable](https://tools.ietf.org/html/rfc7231#section-6.6.4)|Sorry, we are currently experiencing technical difficulties. Please try again later.|None|

<h3 id="delete__api_v1_houses_{house_id}_common-areas_{area_id}-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» message|string|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## post__api_v1_houses_{house_id}_common-areas

> Code samples

```javascript
const inputBody = '{
  "name": "Kitchen"
}';
const headers = {
  'Content-Type':'multipart/form-data',
  'Accept':'application/json'
};

fetch('/api/v1/houses/{house_id}/common-areas',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /api/v1/houses/{house_id}/common-areas`

Creates a common area for a house.

> Body parameter

```yaml
name: Kitchen

```

<h3 id="post__api_v1_houses_{house_id}_common-areas-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|house_id|path|integer|true|none|
|body|body|object|false|none|
|» name|body|string|true|none|

> Example responses

> 200 Response

```json
{
  "type": "success",
  "status": 200,
  "data": "*omitted*"
}
```

<h3 id="post__api_v1_houses_{house_id}_common-areas-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successfully created a common area for the house!|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|The request formData is invalid. Please check your data and try again.|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|User not logged-in or the specified house was created by a different renter.|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|The specified house does not exist.|None|
|503|[Service Unavailable](https://tools.ietf.org/html/rfc7231#section-6.6.4)|Sorry, we are currently experiencing technical difficulties. Please try again later.|None|

<h3 id="post__api_v1_houses_{house_id}_common-areas-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» type|string|false|none|none|
|» status|number|false|none|none|
|» data|string|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## get__api_v1_houses_{house_id}_common-areas

> Code samples

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/api/v1/houses/{house_id}/common-areas',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/v1/houses/{house_id}/common-areas`

Gets all common areas of the house.

<h3 id="get__api_v1_houses_{house_id}_common-areas-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|house_id|path|integer|true|none|
|offset|query|integer|false|The number of notes to skip.|
|limit|query|integer|false|The numbers of notes to return.|

> Example responses

> 200 Response

```json
[
  {
    "id": 1,
    "name": "Kitchen"
  }
]
```

<h3 id="get__api_v1_houses_{house_id}_common-areas-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Returns a list of common areas in a house.|Inline|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|The specified house has no common areas.|None|
|503|[Service Unavailable](https://tools.ietf.org/html/rfc7231#section-6.6.4)|Sorry, we are currently experiencing technical difficulties. Please try again later.|None|

<h3 id="get__api_v1_houses_{house_id}_common-areas-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» id|number|false|none|none|
|» name|string|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="stpp-rentee-api-house-notes-by-house_id-">House Notes by {house_id}</h1>

## get__api_v1_houses_{house_id}_notes_{note_id}

> Code samples

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/api/v1/houses/{house_id}/notes/{note_id}',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/v1/houses/{house_id}/notes/{note_id}`

Gets a note of a house.

<h3 id="get__api_v1_houses_{house_id}_notes_{note_id}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|house_id|path|integer|true|none|
|note_id|path|integer|true|none|

> Example responses

> 200 Response

```json
{
  "id": 1,
  "note": "The front door doesn't work."
}
```

<h3 id="get__api_v1_houses_{house_id}_notes_{note_id}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Gets a note of a house.|Inline|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|The note with the specified id does not exist in the house.|None|
|503|[Service Unavailable](https://tools.ietf.org/html/rfc7231#section-6.6.4)|Sorry, we are currently experiencing technical difficulties. Please try again later.|None|

<h3 id="get__api_v1_houses_{house_id}_notes_{note_id}-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» id|number|false|none|none|
|» note|string|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## patch__api_v1_houses_{house_id}_notes_{note_id}

> Code samples

```javascript
const inputBody = '{
  "note": "The front door doesn't work."
}';
const headers = {
  'Content-Type':'multipart/form-data',
  'Accept':'application/json'
};

fetch('/api/v1/houses/{house_id}/notes/{note_id}',
{
  method: 'PATCH',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`PATCH /api/v1/houses/{house_id}/notes/{note_id}`

Updates a note of a house. (requires to be logged-in as a renter)

> Body parameter

```yaml
note: The front door doesn't work.

```

<h3 id="patch__api_v1_houses_{house_id}_notes_{note_id}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|house_id|path|integer|true|none|
|note_id|path|integer|true|none|
|body|body|object|false|none|
|» note|body|string|true|none|

> Example responses

> 200 Response

```json
{
  "type": "success",
  "status": 200,
  "data": "*omitted*"
}
```

<h3 id="patch__api_v1_houses_{house_id}_notes_{note_id}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Updated a note of a house.|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|The request formData is invalid. Please check your data and try again.|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|User not logged-in or the specified note of the house was created by a different renter.|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|The note with the specified id does not exist in the house.|None|
|503|[Service Unavailable](https://tools.ietf.org/html/rfc7231#section-6.6.4)|Sorry, we are currently experiencing technical difficulties. Please try again later.|None|

<h3 id="patch__api_v1_houses_{house_id}_notes_{note_id}-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» type|string|false|none|none|
|» status|number|false|none|none|
|» data|string|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## delete__api_v1_houses_{house_id}_notes_{note_id}

> Code samples

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/api/v1/houses/{house_id}/notes/{note_id}',
{
  method: 'DELETE',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`DELETE /api/v1/houses/{house_id}/notes/{note_id}`

Deletes a note of a house. (requires to be logged-in as a renter)

<h3 id="delete__api_v1_houses_{house_id}_notes_{note_id}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|house_id|path|integer|true|none|
|note_id|path|integer|true|none|

> Example responses

> 200 Response

```json
{
  "message": "Successfully deleted the note of the house."
}
```

<h3 id="delete__api_v1_houses_{house_id}_notes_{note_id}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Deleted the note of the house.|Inline|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|User not logged-in or the specified note of the house was created by a different renter.|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|The note with the specified id does not exist in the house.|None|
|503|[Service Unavailable](https://tools.ietf.org/html/rfc7231#section-6.6.4)|Sorry, we are currently experiencing technical difficulties. Please try again later.|None|

<h3 id="delete__api_v1_houses_{house_id}_notes_{note_id}-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» message|string|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## post__api_v1_houses_{house_id}_notes

> Code samples

```javascript
const inputBody = '{
  "note": "The front door doesn't work."
}';
const headers = {
  'Content-Type':'multipart/form-data',
  'Accept':'application/json'
};

fetch('/api/v1/houses/{house_id}/notes',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /api/v1/houses/{house_id}/notes`

Creates a note for a house.

> Body parameter

```yaml
note: The front door doesn't work.

```

<h3 id="post__api_v1_houses_{house_id}_notes-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|house_id|path|integer|true|none|
|body|body|object|false|none|
|» note|body|string|true|none|

> Example responses

> 200 Response

```json
{
  "type": "success",
  "status": 200,
  "data": "*omitted*"
}
```

<h3 id="post__api_v1_houses_{house_id}_notes-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successfully created a note for the house!|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|The request formData is invalid. Please check your data and try again.|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|User not logged-in or the specified house was created by a different renter.|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|The specified house does not exist.|None|
|503|[Service Unavailable](https://tools.ietf.org/html/rfc7231#section-6.6.4)|Sorry, we are currently experiencing technical difficulties. Please try again later.|None|

<h3 id="post__api_v1_houses_{house_id}_notes-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» type|string|false|none|none|
|» status|number|false|none|none|
|» data|string|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## get__api_v1_houses_{house_id}_notes

> Code samples

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/api/v1/houses/{house_id}/notes',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/v1/houses/{house_id}/notes`

Gets all notes of the house.

<h3 id="get__api_v1_houses_{house_id}_notes-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|house_id|path|integer|true|none|
|offset|query|integer|false|The number of notes to skip.|
|limit|query|integer|false|The numbers of notes to return.|

> Example responses

> 200 Response

```json
[
  {
    "id": 1,
    "note": "The front door doesn't work."
  }
]
```

<h3 id="get__api_v1_houses_{house_id}_notes-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Returns a list of notes in a house.|Inline|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|The specified house has no notes.|None|
|503|[Service Unavailable](https://tools.ietf.org/html/rfc7231#section-6.6.4)|Sorry, we are currently experiencing technical difficulties. Please try again later.|None|

<h3 id="get__api_v1_houses_{house_id}_notes-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» id|number|false|none|none|
|» note|string|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="stpp-rentee-api-rooms-by-house_id-">Rooms by {house_id}</h1>

## get__api_v1_houses_{house_id}_rooms_{room_id}

> Code samples

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/api/v1/houses/{house_id}/rooms/{room_id}',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/v1/houses/{house_id}/rooms/{room_id}`

Gets a room in a house.

<h3 id="get__api_v1_houses_{house_id}_rooms_{room_id}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|house_id|path|integer|true|none|
|room_id|path|integer|true|none|

> Example responses

> 200 Response

```json
{
  "id": 1,
  "number": 1,
  "description": "Invoices are included. There is a double bed, wardrobe, desk, chair and lampshade.",
  "price": 325
}
```

<h3 id="get__api_v1_houses_{house_id}_rooms_{room_id}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Gets a room in a house.|Inline|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|The room with the specified id does not exist in the house.|None|
|503|[Service Unavailable](https://tools.ietf.org/html/rfc7231#section-6.6.4)|Sorry, we are currently experiencing technical difficulties. Please try again later.|None|

<h3 id="get__api_v1_houses_{house_id}_rooms_{room_id}-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» id|number|false|none|none|
|» number|number|false|none|none|
|» description|string|false|none|none|
|» price|number|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## patch__api_v1_houses_{house_id}_rooms_{room_id}

> Code samples

```javascript
const inputBody = '{
  "number": "1",
  "price": "325",
  "description": "Invoices are included. There is a double bed, wardrobe, desk, chair and lampshade."
}';
const headers = {
  'Content-Type':'multipart/form-data',
  'Accept':'application/json'
};

fetch('/api/v1/houses/{house_id}/rooms/{room_id}',
{
  method: 'PATCH',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`PATCH /api/v1/houses/{house_id}/rooms/{room_id}`

Updates a room in a house. (requires to be logged-in as a renter)

> Body parameter

```yaml
number: "1"
price: "325"
description: Invoices are included. There is a double bed, wardrobe, desk, chair
  and lampshade.

```

<h3 id="patch__api_v1_houses_{house_id}_rooms_{room_id}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|house_id|path|integer|true|none|
|room_id|path|integer|true|none|
|body|body|object|false|none|
|» number|body|string|false|none|
|» price|body|integer|false|none|
|» description|body|string|false|none|

> Example responses

> 200 Response

```json
{
  "type": "success",
  "status": 200,
  "data": "*omitted*"
}
```

<h3 id="patch__api_v1_houses_{house_id}_rooms_{room_id}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Updated a room in a house.|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|The request formData is invalid. Please check your data and try again.|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|User not logged-in or the specified room was created by a different renter.|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|The room with the specified id does not exist in the house.|None|
|503|[Service Unavailable](https://tools.ietf.org/html/rfc7231#section-6.6.4)|Sorry, we are currently experiencing technical difficulties. Please try again later.|None|

<h3 id="patch__api_v1_houses_{house_id}_rooms_{room_id}-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» type|string|false|none|none|
|» status|number|false|none|none|
|» data|string|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## delete__api_v1_houses_{house_id}_rooms_{room_id}

> Code samples

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/api/v1/houses/{house_id}/rooms/{room_id}',
{
  method: 'DELETE',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`DELETE /api/v1/houses/{house_id}/rooms/{room_id}`

Deletes a room in a house. (requires to be logged-in as a renter)

<h3 id="delete__api_v1_houses_{house_id}_rooms_{room_id}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|house_id|path|integer|true|none|
|room_id|path|integer|true|none|

> Example responses

> 200 Response

```json
{
  "message": "Successfully deleted the room listing."
}
```

<h3 id="delete__api_v1_houses_{house_id}_rooms_{room_id}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Deleted a room in a house.|Inline|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|User not logged-in or the specified room was created by a different renter.|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|The room with the specified id does not exist in the house.|None|
|503|[Service Unavailable](https://tools.ietf.org/html/rfc7231#section-6.6.4)|Sorry, we are currently experiencing technical difficulties. Please try again later.|None|

<h3 id="delete__api_v1_houses_{house_id}_rooms_{room_id}-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» message|string|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## post__api_v1_houses_{house_id}_rooms

> Code samples

```javascript
const inputBody = '{
  "number": "1",
  "price": "325",
  "description": "Invoices are included. There is a double bed, wardrobe, desk, chair and lampshade."
}';
const headers = {
  'Content-Type':'multipart/form-data',
  'Accept':'application/json'
};

fetch('/api/v1/houses/{house_id}/rooms',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /api/v1/houses/{house_id}/rooms`

Creates a room listing in a house (requires to be logged-in as a renter).

> Body parameter

```yaml
number: "1"
price: "325"
description: Invoices are included. There is a double bed, wardrobe, desk, chair
  and lampshade.

```

<h3 id="post__api_v1_houses_{house_id}_rooms-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|house_id|path|integer|true|none|
|body|body|object|false|none|
|» number|body|string|true|none|
|» price|body|integer|true|none|
|» description|body|string|true|none|

> Example responses

> 200 Response

```json
{
  "type": "success",
  "status": 200,
  "data": "*omitted*"
}
```

<h3 id="post__api_v1_houses_{house_id}_rooms-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successfully created room listing in the house!|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|The request formData is invalid. Please check your data and try again.|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|User not logged-in or the specified house was created by a different renter.|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|The specified house does not exist.|None|
|409|[Conflict](https://tools.ietf.org/html/rfc7231#section-6.5.8)|The requested room number is already taken. Please choose a different room number.|None|
|503|[Service Unavailable](https://tools.ietf.org/html/rfc7231#section-6.6.4)|Sorry, we are currently experiencing technical difficulties. Please try again later.|None|

<h3 id="post__api_v1_houses_{house_id}_rooms-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» type|string|false|none|none|
|» status|number|false|none|none|
|» data|string|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## get__api_v1_houses_{house_id}_rooms

> Code samples

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/api/v1/houses/{house_id}/rooms',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/v1/houses/{house_id}/rooms`

Gets all rooms in the house.

<h3 id="get__api_v1_houses_{house_id}_rooms-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|house_id|path|integer|true|none|
|offset|query|integer|false|The number of rooms to skip.|
|limit|query|integer|false|The numbers of rooms to return.|

> Example responses

> 200 Response

```json
[
  {
    "id": 1,
    "number": 1,
    "description": "Invoices are included. There is a double bed, wardrobe, desk, chair and lampshade.",
    "price": 325
  }
]
```

<h3 id="get__api_v1_houses_{house_id}_rooms-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Returns a list of rooms in a house.|Inline|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|The specified house has no rooms.|None|
|503|[Service Unavailable](https://tools.ietf.org/html/rfc7231#section-6.6.4)|Sorry, we are currently experiencing technical difficulties. Please try again later.|None|

<h3 id="get__api_v1_houses_{house_id}_rooms-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» id|number|false|none|none|
|» number|number|false|none|none|
|» description|string|false|none|none|
|» price|number|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="stpp-rentee-api-room-notes-by-house_id-and-room_id-">Room Notes by {house_id} and {room_id}</h1>

## get__api_v1_houses_{house_id}_rooms_{room_id}_notes_{note_id}

> Code samples

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/api/v1/houses/{house_id}/rooms/{room_id}/notes/{note_id}',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/v1/houses/{house_id}/rooms/{room_id}/notes/{note_id}`

Gets a note in a room of a house.

<h3 id="get__api_v1_houses_{house_id}_rooms_{room_id}_notes_{note_id}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|house_id|path|integer|true|none|
|room_id|path|integer|true|none|
|note_id|path|integer|true|none|

> Example responses

> 200 Response

```json
{
  "id": 1,
  "note": "The lamp doesn't work."
}
```

<h3 id="get__api_v1_houses_{house_id}_rooms_{room_id}_notes_{note_id}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Gets a note in a room of a house.|Inline|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|The note with the specified id does not exist in the room of the house.|None|
|503|[Service Unavailable](https://tools.ietf.org/html/rfc7231#section-6.6.4)|Sorry, we are currently experiencing technical difficulties. Please try again later.|None|

<h3 id="get__api_v1_houses_{house_id}_rooms_{room_id}_notes_{note_id}-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» id|number|false|none|none|
|» note|string|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## patch__api_v1_houses_{house_id}_rooms_{room_id}_notes_{note_id}

> Code samples

```javascript
const inputBody = '{
  "note": "The lamp doesn't work."
}';
const headers = {
  'Content-Type':'multipart/form-data',
  'Accept':'application/json'
};

fetch('/api/v1/houses/{house_id}/rooms/{room_id}/notes/{note_id}',
{
  method: 'PATCH',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`PATCH /api/v1/houses/{house_id}/rooms/{room_id}/notes/{note_id}`

Updates a note in a room of a house. (requires to be logged-in as a renter)

> Body parameter

```yaml
note: The lamp doesn't work.

```

<h3 id="patch__api_v1_houses_{house_id}_rooms_{room_id}_notes_{note_id}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|house_id|path|integer|true|none|
|room_id|path|integer|true|none|
|note_id|path|integer|true|none|
|body|body|object|false|none|
|» note|body|string|true|none|

> Example responses

> 200 Response

```json
{
  "type": "success",
  "status": 200,
  "data": "*omitted*"
}
```

<h3 id="patch__api_v1_houses_{house_id}_rooms_{room_id}_notes_{note_id}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Updated a note in a room of a house.|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|The request formData is invalid. Please check your data and try again.|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|User not logged-in or the specified note in a room of a house was created by a different renter.|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|The note with the specified id does not exist in the room of the the house.|None|
|503|[Service Unavailable](https://tools.ietf.org/html/rfc7231#section-6.6.4)|Sorry, we are currently experiencing technical difficulties. Please try again later.|None|

<h3 id="patch__api_v1_houses_{house_id}_rooms_{room_id}_notes_{note_id}-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» type|string|false|none|none|
|» status|number|false|none|none|
|» data|string|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## delete__api_v1_houses_{house_id}_rooms_{room_id}_notes_{note_id}

> Code samples

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/api/v1/houses/{house_id}/rooms/{room_id}/notes/{note_id}',
{
  method: 'DELETE',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`DELETE /api/v1/houses/{house_id}/rooms/{room_id}/notes/{note_id}`

Deletes a note in a room of a house. (requires to be logged-in as a renter)

<h3 id="delete__api_v1_houses_{house_id}_rooms_{room_id}_notes_{note_id}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|house_id|path|integer|true|none|
|room_id|path|integer|true|none|
|note_id|path|integer|true|none|

> Example responses

> 200 Response

```json
{
  "message": "Successfully deleted the note of the room in the house."
}
```

<h3 id="delete__api_v1_houses_{house_id}_rooms_{room_id}_notes_{note_id}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Deleted the note of the room in the house.|Inline|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|User not logged-in or the specified note of the room in the house was created by a different renter.|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|The note with the specified id does not exist in the room of the the house.|None|
|503|[Service Unavailable](https://tools.ietf.org/html/rfc7231#section-6.6.4)|Sorry, we are currently experiencing technical difficulties. Please try again later.|None|

<h3 id="delete__api_v1_houses_{house_id}_rooms_{room_id}_notes_{note_id}-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» message|string|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## post__api_v1_houses_{house_id}_rooms_{room_id}_notes

> Code samples

```javascript
const inputBody = '{
  "note": "The lamp doesn't work."
}';
const headers = {
  'Content-Type':'multipart/form-data',
  'Accept':'application/json'
};

fetch('/api/v1/houses/{house_id}/rooms/{room_id}/notes',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /api/v1/houses/{house_id}/rooms/{room_id}/notes`

Creates a note for a room (requires to be logged-in as a renter).

> Body parameter

```yaml
note: The lamp doesn't work.

```

<h3 id="post__api_v1_houses_{house_id}_rooms_{room_id}_notes-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|house_id|path|integer|true|none|
|room_id|path|integer|true|none|
|body|body|object|false|none|
|» note|body|string|true|none|

> Example responses

> 200 Response

```json
{
  "type": "success",
  "status": 200,
  "data": "*omitted*"
}
```

<h3 id="post__api_v1_houses_{house_id}_rooms_{room_id}_notes-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successfully created a note for the room in the house!|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|The request formData is invalid. Please check your data and try again.|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|User not logged-in or the specified room was created by a different renter.|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|The specified room does not exist in the specified house.|None|
|503|[Service Unavailable](https://tools.ietf.org/html/rfc7231#section-6.6.4)|Sorry, we are currently experiencing technical difficulties. Please try again later.|None|

<h3 id="post__api_v1_houses_{house_id}_rooms_{room_id}_notes-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» type|string|false|none|none|
|» status|number|false|none|none|
|» data|string|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## get__api_v1_houses_{house_id}_rooms_{room_id}_notes

> Code samples

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/api/v1/houses/{house_id}/rooms/{room_id}/notes',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/v1/houses/{house_id}/rooms/{room_id}/notes`

Gets all notes of the room.

<h3 id="get__api_v1_houses_{house_id}_rooms_{room_id}_notes-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|house_id|path|integer|true|none|
|room_id|path|integer|true|none|
|offset|query|integer|false|The number of notes to skip.|
|limit|query|integer|false|The numbers of notes to return.|

> Example responses

> 200 Response

```json
[
  {
    "id": 1,
    "note": "The lamp doesn't work."
  }
]
```

<h3 id="get__api_v1_houses_{house_id}_rooms_{room_id}_notes-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Returns a list of notes in a room.|Inline|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|The specified room has no notes.|None|
|503|[Service Unavailable](https://tools.ietf.org/html/rfc7231#section-6.6.4)|Sorry, we are currently experiencing technical difficulties. Please try again later.|None|

<h3 id="get__api_v1_houses_{house_id}_rooms_{room_id}_notes-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» id|number|false|none|none|
|» note|string|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

