package parkup.configs.email;

import org.springframework.stereotype.Service;

import java.util.function.Predicate;

@Service
public class EmailValidator implements Predicate<String> {
    @Override
    public boolean test(String s) {
        //TODO: in the future implement a method that checks the validality of the email address
        return true;
    }
}
