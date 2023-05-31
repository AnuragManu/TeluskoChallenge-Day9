# TeluskoChallenge-Day9

# Note : we have a readme file in each of the section i.e. the front end and the backend 

## Demo Video of the Quiz App



https://github.com/AnuragManu/TeluskoChallenge-Day9/assets/67887308/afc7a531-1556-4de6-ad2e-d9968b367966

# Simplifying Java Development with Modern Features
Java development has been made more convenient and expressive with the introduction of several modern features. Let's explore some of these features that enhance code readability and reduce boilerplate code.

- Switch expressions, available since Java 12, allow for more concise code when handling multiple branching conditions. They can be used as expressions that return a value, simplifying conditional logic.
```java
int dayOfWeek = 3;
String dayName = switch (dayOfWeek) {
    case 1 -> "Monday";
    case 2 -> "Tuesday";
    case 3 -> "Wednesday";
    case 4 -> "Thursday";
    case 5 -> "Friday";
    case 6, 7 -> "Weekend";
    default -> "Invalid day";
};
System.out.println("Today is " + dayName);
```
- Var:
Introduced in Java 10, the 'var' keyword enables type inference when declaring variables. It reduces verbosity by automatically inferring the type based on the assigned value, making the code more concise.
```java
var name = "John Doe";
var age = 25;
var isStudent = true;
System.out.println(name + " is " + age + " years old.");
```
- Sealed Classes:Java 15 introduced sealed classes, which restrict the subclasses that can extend a particular class. By explicitly permitting only specific subclasses, it provides more control over class hierarchies and improves code maintainability.
```java
public sealed class Shape permits Circle, Rectangle, Triangle {
    // Common methods & fields
}

final class Circle extends Shape {
    // Circle specific implementation
}

final class Rectangle extends Shape {
    // Rectangle specific implementation
}

final class Triangle extends Shape {
    // Triangle specific implementation
}

```
- Record Classes:
Record classes, available from Java 14 onwards, offer a succinct way to define data-centric classes. They automatically generate standard methods like equals(), hashCode(), and toString(), reducing boilerplate code and promoting immutability.
```java
record Person(String name, int age) {
    // Additional methods and fields
}

Person person = new Person("Alice", 30);
System.out.println(person);
```
- Text Blocks:
Java 13 introduced text blocks, which simplify the creation of multiline strings. They allow for easy formatting, including line breaks and indentation, making the code more readable, especially for large text blocks.
```java
String html = """
    <html>
        <body>
            <h1>Welcome</h1>
            <p>Hello, world!</p>
        </body>
    </html>
    """;
System.out.println(html);
```
- String Templates:
Java 15 introduced string templates, allowing for direct embedding of expressions within string literals. This simplifies string concatenation and eliminates the need for explicit conversions, resulting in more concise and readable code.
```java
String name = "Alice";
int age = 30;
String message = String.format("My name is %s and I'm %d years old.", name, age);
System.out.println(message);

```

