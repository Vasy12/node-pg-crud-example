class Thing {
  static client = null;
  static tableName = 'things';
  static attributes = {
    id: 'number',
    body: 'string',
  };

  static async create(values) {
    const insetAttrs = [];
    for (const attr in this.attributes) {
      if (attr in values) {
        insetAttrs.push(attr);
      }
    }
    const valuesSchemaString = insetAttrs.map(attr => `"${attr}"`).join();
    const valuesString = insetAttrs
      .map(attr =>
        typeof values[attr] === 'string' ? `'${values[attr]}'` : values[attr]
      )
      .join();

    const timestamp = new Date().toISOString();

    const insertStr = `INSERT INTO "${this.tableName}" (${valuesSchemaString}, "createdAt", "updatedAt") VALUES (${valuesString},'${timestamp}', '${timestamp}') RETURNING *;`;

    const {
      rows: [thing],
    } = await this.client.query(insertStr);

    return thing;
  }

  static async findAll(options) {
    const { rows } = await this.client.query(
      `SELECT * FROM "${this.tableName}";`
    );

    return rows;
  }
  static async findByPk(pkValue) {
    const {
      rows: [thing],
    } = await this.client.query(
      `SELECT * FROM "${this.tableName}" WHERE id = ${pkValue};`
    );
    return thing;
  }

  static async updateByPk(pkValue, values) {
    const insetAttrs = [];
    for (const attr in this.attributes) {
      if (attr in values) {
        insetAttrs.push(attr);
      }
    }

    const updateSchemaStr = insetAttrs
      .map(
        attr =>
          `"${attr}"=${
            typeof values[attr] === 'string'
              ? `'${values[attr]}'`
              : values[attr]
          }`
      )
      .join();

    const timestamp = new Date().toISOString();

    const updateQueryString = `UPDATE "${this.tableName}"\n
     SET ${updateSchemaStr}, "updatedAt"='${timestamp}'\n
      WHERE id=${pkValue}\n
       RETURNING *;`;

    const {
      rows: [thing],
    } = await this.client.query(updateQueryString);

    return thing;
  }
  static async deleteByPk(pkValue) {
    const {
      rows: [thing],
    } = await this.client.query(
      `DELETE FROM "${this.tableName}" WHERE id = ${pkValue} RETURNING *;`
    );
    return thing;
  }
}

module.exports = Thing;
