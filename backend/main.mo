import Error "mo:base/Error";

import Float "mo:base/Float";
import Debug "mo:base/Debug";

actor Calculator {
    public func add(a : Float, b : Float) : async Float {
        return a + b;
    };

    public func subtract(a : Float, b : Float) : async Float {
        return a - b;
    };

    public func multiply(a : Float, b : Float) : async Float {
        return a * b;
    };

    public func divide(a : Float, b : Float) : async ?Float {
        if (b == 0) {
            Debug.print("Error: Division by zero");
            return null;
        } else {
            return ?(a / b);
        };
    };
}
