<?php

namespace App\Events;

use App\Value;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;

class NewValue implements ShouldBroadcastNow
{
	use Dispatchable, InteractsWithSockets, SerializesModels;

	public $value;

	/**
     * Create a new event instance.
     *
     * @return void
     */
	public function __construct(Value $value)
	{
		$this->value = $value;
	}

	/**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
	public function broadcastOn()
	{
		return new Channel('devices.' . $this->value->device_id);
	}

	public function broadcastWith()
	{
		return [
			'value' => $this->value,
		];
	}
}
