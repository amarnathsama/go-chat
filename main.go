package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/pusher/pusher-http-go"
)

func main() {
	app := fiber.New()

	app.Use(cors.New())

	pusherClient := pusher.Client{
		AppID:   "1506059",
		Key:     "4da74743cb3e0245215d",
		Secret:  "4aaedb75acd32f8bb985",
		Cluster: "ap3",
		Secure:  true,
	}

	data := map[string]string{"message": "hello world"}
	pusherClient.Trigger("my-channel", "my-event", data)

	app.Post("/api/messages", func(c *fiber.Ctx) error {
		var data map[string]string

		if err := c.BodyParser((&data)); err != nil {
			return err
		}
		pusherClient.Trigger("chat", "message", data)
		return c.JSON([]string{})
	})

	app.Listen(":8000")
}
