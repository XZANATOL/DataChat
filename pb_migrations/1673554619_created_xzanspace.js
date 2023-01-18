migrate((db) => {
  const collection = new Collection({
    "id": "rg6vh3b9oigrit1",
    "created": "2023-01-12 20:16:59.496Z",
    "updated": "2023-01-12 20:16:59.496Z",
    "name": "xzanspace",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "lfoqakqd",
        "name": "channel",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "odgai9j8",
        "name": "text",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "l4zfin7p",
        "name": "files",
        "type": "file",
        "required": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "maxSize": 5242880,
          "mimeTypes": [],
          "thumbs": []
        }
      }
    ],
    "listRule": "@request.method = \"GET\" && @request.auth.id != \"\"",
    "viewRule": null,
    "createRule": "@request.method = \"POST\" && @request.auth.id != \"\"",
    "updateRule": null,
    "deleteRule": "@request.method = \"DELETE\" && @request.auth.id != \"\"",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("rg6vh3b9oigrit1");

  return dao.deleteCollection(collection);
})
