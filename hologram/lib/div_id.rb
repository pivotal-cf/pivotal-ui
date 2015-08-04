class DivId
  @current_id = 0

  def self.next_id
    val = "react-example-#{@current_id}"
    @current_id += 1
    val
  end
end