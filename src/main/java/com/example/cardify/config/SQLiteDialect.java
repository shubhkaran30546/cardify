//package com.example.cardify.config;
//
//import org.hibernate.dialect.Dialect;
//import org.hibernate.dialect.function.StandardSQLFunction;
//import org.hibernate.dialect.function.SQLFunction;
//import org.hibernate.type.StandardBasicTypes;
//
//import java.sql.Types;
//
//public class SQLiteDialect extends Dialect {
//
//    public SQLiteDialect() {
//        super();
//
//        // Register column types
//        registerColumnType(Types.INTEGER, "integer");
//        registerColumnType(Types.VARCHAR, "text");
//        registerColumnType(Types.BLOB, "blob");
//        registerColumnType(Types.REAL, "real");
//        registerColumnType(Types.TIMESTAMP, "datetime");
//
//        // Register SQLite functions
//        registerFunction("concat", new StandardSQLFunction("concat", StandardBasicTypes.STRING));
//        registerFunction("mod", new StandardSQLFunction("mod", StandardBasicTypes.INTEGER));
//        registerFunction("substr", new StandardSQLFunction("substr", StandardBasicTypes.STRING));
//        registerFunction("length", new StandardSQLFunction("length", StandardBasicTypes.INTEGER));
//    }
//
//    @Override
//    public boolean supportsIdentityColumns() {
//        return true;
//    }
//
//    @Override
