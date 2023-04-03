'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({first}) {
      // define association here
      // LINKING
      // 
      this.belongsTo(first , {foreignKey:"userId"})
    }

    toJSON(){
      return {...this.get(),id:undefined,userId:undefined}
    }

  }
  Post.init({
    uuid:{
      type:DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4
    },
    body:{
      type:DataTypes.STRING,
      allowNull:false
    }
  }, {


    sequelize,
    
    modelName: 'Post',
  });
  return Post;
};