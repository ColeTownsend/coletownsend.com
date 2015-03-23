# == Dependencies ==============================================================

require 'rake'
require 'yaml'
require 'fileutils'
require 'rbconfig'

# == Configuration =============================================================

# Set "rake watch" as default task
task :default => :post

# Load the configuration file
CONFIG = YAML.load_file("_config.yml")

# Get and parse the date
DATE = Time.now.strftime("%Y-%m-%d")
TIME = Time.now.strftime("%H:%M:%S")
POST_TIME = DATE + ' ' + TIME

# Directories
POSTS = "src/_posts"
DRAFTS = "src/_drafts"

# == Helpers ===================================================================

# Execute a system command
def execute(command)
  system "#{command}"
end

# Chech the title
def check_title(title)
  if title.nil? or title.empty?
    raise "Please add a title to your file."
  end
end

# Transform the filename and date to a slug
def transform_to_slug(title, extension)
  characters = /("|'|!|\?|:|\s\z)/
  whitespace = /\s/
  "#{title.gsub(characters,"").gsub(whitespace,"-").downcase}.#{extension}"
end

# Read the template file
def read_file(template)
  File.read(template)
end

# Save the file with the title in the YAML front matter
def write_file(content, title, directory, filename)
  parsed_content = "#{content.sub("title:", "title: \"#{title}\"")}"
  parsed_content = "#{parsed_content.sub("date:", "date: #{POST_TIME}")}"
  File.write("#{directory}/#{filename}", parsed_content)
  puts "#{filename} was created in '#{directory}'."
end

# Create the file with the slug and open the default editor
def create_file(directory, filename, content, title, editor)
  FileUtils.mkdir(directory) unless File.exists?(directory)
  if File.exists?("#{directory}/#{filename}")
    raise "The file already exists."
  else
    write_file(content, title, directory, filename)
    if editor && !editor.nil?
      sleep 1
      execute("#{editor} #{directory}/#{filename}")
    end
  end
end

# Get the "open" command
def open_command
  if RbConfig::CONFIG["host_os"] =~ /mswin|mingw/
    "start"
  elsif RbConfig::CONFIG["host_os"] =~ /darwin/
    "open"
  else
    "xdg-open"
  end
end

# == Tasks =====================================================================

# rake post["Title"]
desc "Create a post in _posts"
task :post, :title do |t, args|
  title = args[:title]
  template = CONFIG["post"]["template"]
  extension = CONFIG["post"]["extension"]
  editor = CONFIG["editor"]
  check_title(title)
  filename = "#{DATE}-#{transform_to_slug(title, extension)}"
  content = read_file(template)
  create_file(POSTS, filename, content, title, editor)
end

# rake draft["Title"]
desc "Create a post in _drafts"
task :draft, :title do |t, args|
  title = args[:title]
  template = CONFIG["post"]["template"]
  extension = CONFIG["post"]["extension"]
  editor = CONFIG["editor"]
  check_title(title)
  filename = transform_to_slug(title, extension)
  content = read_file(template)
  create_file(DRAFTS, filename, content, title, editor)
end

# rake publish
desc "Move a post from _drafts to _posts"
task :publish do
  extension = CONFIG["post"]["extension"]
  files = Dir["#{DRAFTS}/*.#{extension}"]
  files.each_with_index do |file, index|
    puts "#{index + 1}: #{file}".sub("#{DRAFTS}/", "")
  end
  print "> "
  number = $stdin.gets
  if number =~ /\D/
    filename = files[number.to_i - 1].sub("#{DRAFTS}/", "")
    FileUtils.mv("#{DRAFTS}/#{filename}", "#{POSTS}/#{DATE}-#{filename}")
    puts "#{filename} was moved to '#{POSTS}'."
  else
    puts "Please choose a draft by the assigned number."
  end
end


# thumbnail images
desc "Create thumbs of images"
task :thumbs do
  message = ARGV.last
  task message.to_sym do ; end
  system "cd src/assets/images/inline; sips -Z 720 *.png *.jpg --out thumbs"
  system "cd ../"
  puts "Created thumbnail images."
end


# rake deploy["Commit message"]
desc "Deploy the site to a remote git repo"
task :deploy, :message do |t, args|
  message = args[:message]
  if message.nil? or message.empty?
    raise "Please add a commit message."
  end
  execute("git add .")
  execute("git commit -m \"#{message}\"")
  execute("git push")
end
