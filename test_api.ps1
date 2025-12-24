$baseUrl = "http://localhost:8080/api"
$testEmail = "apitestuser@example.com"
$testPassword = "password123"

function Test-Endpoint {
    param (
        [string]$Method,
        [string]$Url,
        [hashtable]$Headers = @{},
        [string]$Body = $null,
        [string]$Description
    )

    Write-Host "Testing $Description..." -NoNewline
    
    try {
        $params = @{
            Method = $Method
            Uri = $Url
            ContentType = "application/json"
            ErrorAction = "Stop"
        }
        if ($Headers.Keys.Count -gt 0) { $params.Headers = $Headers }
        if (-not [string]::IsNullOrEmpty($Body)) { $params.Body = $Body }

        $response = Invoke-RestMethod @params
        Write-Host " [OK]" -ForegroundColor Green
        return $response
    }
    catch {
        Write-Host " [FAILED]" -ForegroundColor Red
        Write-Host "Error: $($_.Exception.Message)"
        if ($_.Exception.Response) {
             # Read the response stream if available
             $stream = $_.Exception.Response.GetResponseStream()
             $reader = New-Object System.IO.StreamReader($stream)
             $responseBody = $reader.ReadToEnd()
             Write-Host "Response Body: $responseBody"
        }
        return $null
    }
}

# 1. Register
$registerBody = @{
    name = "API Test User"
    email = $testEmail
    password = $testPassword
    role = "User"
    fitnessGoal = "Muscle Gain"
} | ConvertTo-Json

Test-Endpoint -Method POST -Url "$baseUrl/auth/register" -Body $registerBody -Description "Register User"

# 2. Login
$loginBody = @{
    email = $testEmail
    password = $testPassword
} | ConvertTo-Json

$loginResponse = Test-Endpoint -Method POST -Url "$baseUrl/auth/login" -Body $loginBody -Description "Login"

if (-not $loginResponse -or -not $loginResponse.token) {
    Write-Host "Cannot proceed without token." -ForegroundColor Red
    exit
}

$token = $loginResponse.token
Write-Host "Token received (Length: $($token.Length))" -ForegroundColor Gray
$authHeader = @{ Authorization = "Bearer $token" }

# 3. Get Public Blog Posts
Test-Endpoint -Method GET -Url "$baseUrl/blog/posts" -Description "Get Public Posts"

# 4. Create Protected Blog Post
$postBody = @{
    title = "API Test Post"
    excerpt = "Testing from script"
    content = "This is a test post created by the API verification script."
    category = "Fitness"
    image = "https://via.placeholder.com/150"
} | ConvertTo-Json

$createdPost = Test-Endpoint -Method POST -Url "$baseUrl/blog/posts" -Headers $authHeader -Body $postBody -Description "Create Post (Protected)"

if ($createdPost) {
    Write-Host "Post created successfully ID: $($createdPost.id)" -ForegroundColor Green
}

# 5. Get Trainers (Public)
Test-Endpoint -Method GET -Url "$baseUrl/trainers" -Description "Get Trainers"

Write-Host "`nAll checks completed."
