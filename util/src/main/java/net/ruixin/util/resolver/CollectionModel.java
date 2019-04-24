package net.ruixin.util.resolver;

import java.lang.annotation.*;


@Target({ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface CollectionModel {
    //前端传参名称
    String value() default "";

    Class target();
}
