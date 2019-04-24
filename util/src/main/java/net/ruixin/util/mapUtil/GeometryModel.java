package net.ruixin.util.mapUtil;

import java.lang.annotation.*;


@Target({ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface GeometryModel {
    String value() default "";
}
