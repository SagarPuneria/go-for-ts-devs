# GoLang for TypeScript Developers

![image](https://github-production-user-asset-6210df.s3.amazonaws.com/57500163/250738309-02b2e316-ac6d-4928-a6d8-c69a3c538411.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20260215%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20260215T110509Z&X-Amz-Expires=300&X-Amz-Signature=70d1e48fe67c1682322a67401b3f569294b4c58f65e039cfa579c3fa7954e562&X-Amz-SignedHeaders=host)

> A repository to help TypeScript developers learn Go, comparing code examples in Go and TypeScript.

## Introduction

Welcome to the **GoLang for TypeScript Developers** repository! This repository aims to assist TypeScript developers in learning the Go programming language by providing side-by-side code examples in Go and TypeScript.

Whether you're an experienced TypeScript developer or just starting out, this repository will help you understand the syntax, concepts, and idiomatic patterns of Go, drawing parallels with TypeScript.

## Why Learn Go as a TypeScript Developer?

- **Performance**: Go compiles to native machine code, offering significant performance improvements for CPU-intensive tasks
- **Concurrency**: Go's goroutines and channels make concurrent programming simple and efficient
- **Deployment**: Single binary deployment simplifies distribution and reduces dependencies
- **Backend Development**: Go excels in building scalable backend services, APIs, and microservices
- **Cloud Native**: Popular for cloud infrastructure, containers (Docker, Kubernetes), and DevOps tools
- **Career Growth**: Expanding your skill set with a compiled, systems-level language opens new opportunities

## Who This Repository Is For

- **TypeScript/JavaScript developers** curious about Go
- **Full-stack developers** wanting to add a performant backend language to their toolkit
- **Backend engineers** looking to compare Go with TypeScript patterns
- **Students and learners** seeking practical, side-by-side code comparisons

## Repository Structure

The repository is organized into topic-based folders, each containing equivalent Go and TypeScript implementations for easy comparison:

### Core Concepts

- **`arrays/`**: Array and slice operations in Go vs TypeScript
  - `arrays_slices.go` and `arrays.ts`: Basic array/slice usage
  - `array_methods/`: Common array methods comparison (map, filter, reduce, etc.)

- **`variables/`**: Variable declarations, types, and scoping
  - `variables.go` and `variables.ts`: Variable declaration patterns

- **`functions/`**: Function definitions, parameters, and return values
  - `functions.go` and `functions.ts`: Function syntax and features

- **`conditionals/`**: Control flow and conditional statements
  - `conditionals.go` and `conditionals.ts`: if/else, switch/case patterns

- **`loops/`**: Iteration patterns and loop constructs
  - `loops.go` and `loops.ts`: for loops, while equivalents, range iteration

### Data Structures & Types

- **`strings/`**: String manipulation and operations
  - `strings.go` and `strings.ts`: String methods and utilities

- **`numbers/`**: Number types and mathematical operations
  - `numbers.go` and `numbers.ts`: Integer, float, and math operations

- **`maps/`**: Key-value data structures (Maps/Objects)
  - `maps.go` and `maps.ts`: Map/Dictionary operations

- **`struct_interfaces/`**: Type definitions and interfaces
  - `structs.go` and `interfaces.ts`: Struct vs Interface patterns

### Advanced Topics

- **`class/`**: Object-oriented programming patterns
  - `class.go` and `class.ts`: Class-like structures and methods

- **`pointers/`**: Memory references and pointer concepts
  - `pointers.go` and `pointers.ts`: Pointer usage (Go) vs references (TS)

- **`error_handling/`**: Error handling strategies
  - `error_handling.go` and `error_handling.ts`: Error patterns in both languages

- **`file_handling/`**: File I/O operations
  - `file_handling.go` and `file_handling.ts`: Reading and writing files
  - Example output files: `output-go.txt` and `output-ts.txt`

### Performance & Testing

- **`go_node_comparison/`**: Performance comparison between Go and Node.js
  - `go/main.go`: Go implementation
  - `node/index.js` and `worker.js`: Node.js implementation

- **`tests/`**: Testing examples and patterns
  - `test.go`: Go testing examples

## Getting Started

### Prerequisites

- **Go**: Version 1.20 or higher ([Download Go](https://golang.org/dl/))
- **Node.js & npm**: For running TypeScript examples ([Download Node.js](https://nodejs.org/))
- **TypeScript**: Install globally with `npm install -g typescript ts-node`

### Setup Instructions

1. Clone the repository:

   ```bash
   git clone https://github.com/SagarPuneria/go-for-ts-devs.git
   ```

2. Navigate to the repository directory:

   ```bash
   cd go-for-ts-devs
   ```

3. (Optional) Install Node.js dependencies:

   ```bash
   npm install
   ```

### Running Examples

Each topic is organized in its own folder with side-by-side implementations. Navigate to any folder and run the examples:

**Example: Running array examples**

```bash
# Navigate to the arrays folder
cd arrays

# Run the Go implementation
go run arrays_slices.go

# Run the TypeScript implementation
npx ts-node arrays.ts
```

**Running all files in a folder**

For folders with multiple Go files:
```bash
cd <folder-name>
go run *.go
```

For TypeScript files:
```bash
cd <folder-name>
npx ts-node <filename>.ts
```

### Exploring the Repository

1. Start with fundamental concepts: `variables/`, `functions/`, and `conditionals/`
2. Progress to data structures: `arrays/`, `strings/`, `numbers/`, and `maps/`
3. Explore advanced topics: `struct_interfaces/`, `pointers/`, `error_handling/`, and `file_handling/`
4. Compare performance: Check out `go_node_comparison/` for real-world performance comparisons

## Key Differences: Go vs TypeScript

As you explore the examples, you'll discover important differences between Go and TypeScript:

### Type System
- **Go**: Statically typed with compile-time type checking, no generics in earlier versions
- **TypeScript**: Statically typed with structural typing, advanced type features (unions, generics, etc.)

### Memory Management
- **Go**: Automatic garbage collection with efficient memory management, explicit pointers
- **TypeScript/JavaScript**: Automatic garbage collection, references only (no explicit pointers)

### Concurrency
- **Go**: Built-in goroutines and channels for concurrent programming
- **TypeScript/JavaScript**: Promises, async/await, event loop (single-threaded with async I/O)

### Error Handling
- **Go**: Explicit error returns, no exceptions (errors are values)
- **TypeScript**: try/catch blocks, exception-based error handling

### Object-Oriented Programming
- **Go**: Composition over inheritance, struct types with methods, interfaces
- **TypeScript**: Class-based with inheritance, interfaces, abstract classes

### Compilation
- **Go**: Compiled to native machine code, single binary output
- **TypeScript**: Transpiled to JavaScript, runs on Node.js/browsers

## Contributions

Contributions to this repository are welcome! If you find errors, wish to add new code examples, or have suggestions for improvements, feel free to open an issue or submit a pull request. Let's make this repository a valuable resource for the TypeScript community learning Go!

## Resources

Here are some additional resources to further enhance your learning journey in Go:

### Official Documentation
- [Official Go Documentation](https://golang.org/doc/)
- [A Tour of Go](https://tour.golang.org/welcome/1) - Interactive tutorial
- [Effective Go](https://golang.org/doc/effective_go.html) - Best practices guide
- [Go by Example](https://gobyexample.com/) - Hands-on examples

### Learning Resources
- [Go Dev](https://go.dev/learn/) - Official learning paths
- [Go Playground](https://play.golang.org/) - Online Go compiler
- [Go Wiki](https://github.com/golang/go/wiki) - Community resources

### Books & Tutorials
- [The Go Programming Language](https://www.gopl.io/) by Donovan & Kernighan
- [Learn Go with Tests](https://quii.gitbook.io/learn-go-with-tests/) - TDD approach
- [Practical Go Lessons](https://www.practical-go-lessons.com/) - Comprehensive guide

### Community
- [Go Forum](https://forum.golangbridge.org/)
- [Go Subreddit](https://www.reddit.com/r/golang/)
- [Gophers Slack](https://invite.slack.golangbridge.org/)

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

---

Let's learn and explore the world of Go together! Happy coding! 🚀
