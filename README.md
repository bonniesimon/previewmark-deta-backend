
# Project Title

Backend for PreviewMark📙 build using Node, Express and Deta ❤.

## Docs

To deploy the server to Deta Micro
```bash
  deta deploy
```

## API Reference

#### Post publish page

```http
  POST /publish-page

  request body  
  {
	  markdown: _string,
	  date: _string
  }
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| markdown | `string` | **Required**. This is the markdown that is to be displayed. |
| date | `string` | **Required**. This should be in the mm/dd/yyyy format. |

#### GET page by id

```http
  GET /pages/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of page to fetch |


## Tech Stack

**Server:** Node, Express  
**Database:** Deta Base  
**Hosted on:** Deta Micors

  
## Authors

- [@bonniesimon](https://www.github.com/bonniesimon)

  
